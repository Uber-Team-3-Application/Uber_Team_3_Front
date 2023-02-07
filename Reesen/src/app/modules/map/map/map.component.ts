import { AfterViewInit, OnDestroy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs'
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleType } from 'src/app/models/Vehicle';
import { Location, Route, VehicleLocationWithAvailibility } from 'src/app/models/Location';
import { VehicleService } from 'src/app/modules/driver/services/vehicle.service';
import { UserService } from '../../unregistered-user/user.service';
import { RideInfo, RideInfoBody, CreateRideDTO, RideSimulationDTO, VehicleSimulationDTO, Ride, FavoriteRide } from 'src/app/models/Ride';

import { UserRestrict } from 'src/app/models/User';
import { greenCar, redCar, carMyRide, carPanic } from '../icons/icons';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import { RideService } from '../../services/ride.service';
import * as SockJS from 'sockjs-client';
import * as myStomp from 'stompjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input() isOnlyMap = false;
  @Input() departureRideInfo = '';
  @Input() destinationRideInfo = '';
  rideEnded = false;
  private map: any;
  private currentRoute: L.Routing.Control | null = null;
  isDriver = false;
  rideButtonText = 'Get Ride info';
  showGetRide = false;
  showVehicleType = false;
  showDateTime = false;
  vehicleTypes: VehicleType[];
  typeSelected = false;
  selectedVehicleName = '';
  waitingForRide = false;
  scheduledTime = null;

  showFavoriteRides = false;
  favoriteRides: FavoriteRide[];

  splitPassengers = [];
  isFormValid = true;
  isRideInfoOpened = false;
  rideDeclined = false;
  rideAccepted = false;

  id = 0;
  @Input() role = '';
  decodedToken = null;
  rideAssumption: RideInfo = {
    estimatedTimeInMinutes: 0,
    estimatedCost: 0
  }

  vehicles: { [vehicleId: number]: L.Marker } = {};

  vehicleLocations: VehicleLocationWithAvailibility[];
  markers = new Array();

  stompClient: any;
  stompClientSimulation: any;

  panicPressed = null;
  rides: any = {};
  mainGroup: L.LayerGroup[] = [];
  socketEndpoint = 'http://localhost:8082/socket';
  simulationEndpoint = 'http://localhost:8082/vehicle-simulation';

  acceptNotification = false;
  acceptRide: Ride;



  initializeWebSocketConnection() {
    let ws = new SockJS(this.socketEndpoint);
    //this.stompClient = Stomp.Stomp.over(ws);

    this.stompClient = myStomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }
  initializeWebSocketSimulationConnection(){
    let ws = new SockJS(this.simulationEndpoint);

    this.stompClientSimulation = myStomp.over(ws);
    this.stompClientSimulation.debug = null;
    let that = this;
    this.stompClientSimulation.connect({}, function () {
      that.openSimulationSocket();
    });
  }
  openSimulationSocket(){
    this.stompClientSimulation.subscribe('/topic/map-updates', (message: {body: string}) =>{
      const newLocation = JSON.parse(message.body);
      const vehicle = this.vehicles[newLocation.id];
      if(this.rideEnded){
        vehicle.setIcon(greenCar);
        return;
      }

      if(this.panicPressed !== null){
        vehicle.setIcon(carPanic);
        vehicle.setLatLng([newLocation.longitude, newLocation.latitude]);
        return;
      }
      if(this.role === 'PASSENGER' || this.role === 'DRIVER'){
        vehicle.setIcon(carMyRide);
      }else{
        vehicle.setIcon(redCar);
      }
      vehicle.setLatLng([newLocation.longitude, newLocation.latitude]);

    });
    this.stompClientSimulation.subscribe('/topic/map-updates-regular', (message: {body: string}) =>{
      const newLocation = JSON.parse(message.body);
      const vehicle = this.vehicles[newLocation.id];

      vehicle.setIcon(greenCar);
      vehicle.setLatLng([newLocation.latitude, newLocation.longitude]);

    });

  }

  openGlobalSocket() {
    if(this.id && this.role !== 'ADMIN'){
      this.stompClient.subscribe('/topic/panic/' + this.id, (message: { body: string }) => {
          let ride = JSON.parse(message.body);
          this.vehicleService.get(ride.driver.id).subscribe({
            next:(result) =>{
              this.vehicles[result.id].setIcon(carPanic);
            },
            error:(error) =>{
                console.log(error);
            }
          });

      });

    }
    this.setAdminSockets();


    if (this.role === 'DRIVER') {
      this.setDriverSockets();


    } else if (this.role === 'PASSENGER') {
      this.setPassengerSockets();
    }

  }

  getRideForm = new FormGroup({
    departure: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destination: new FormControl('', [Validators.required, Validators.minLength(3)]),
    passengers: new FormControl('', []),
    babyTransport: new FormControl(false),
    petTransport: new FormControl(false),
    scheduled: new FormControl(false),
    scheduledTime: new FormControl(new Date())
  });

  constructor(private mapService: MapService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private rideService: RideService,
    private tokenDecoder: TokenDecoderService,
    private router: Router) {

    const tokenObservable = new Observable(subscriber => {
      subscriber.next(this.tokenDecoder.getDecodedAccesToken());

      window.addEventListener('storage', (event) => {
        subscriber.next(this.tokenDecoder.getDecodedAccesToken());
      });
    });

    tokenObservable.subscribe(token => {
      if (token !== null) {
        this.decodedToken = token;
        this.id = + this.decodedToken.id;

        this.role = this.decodedToken.role[0]['authority'];
        console.log(this.role);
      } else {
        this.id = 0;
        this.role = '';
        console.log('LOGOUT');
      }
    });

  }

  private setPassengerSockets() {
    this.stompClient.subscribe('/topic/panic/' + this.id, (message: { body: string }) => {
      let ride = JSON.parse(message.body);
      this.vehicleService.get(ride.driver.id).subscribe({
        next:(result) =>{
          this.vehicles[result.id].setIcon(carPanic);
        },
        error:(error) =>{
            console.log(error);
        }
      });

  });
    this.stompClient.subscribe('/topic/passenger/ride/' + this.id, (message: { body: string; }) => {
      console.log(message);
      if (message.body === "You have a scheduled ride!") {
        alert("You have a scheduled ride!");
      }
      else {
        this.acceptRide = JSON.parse(message.body);
        if (this.acceptRide.status === "ACCEPTED") {
          this.rideService.setRideEnded(false);
          this.rideAccepted = true;
          this.acceptRide.estimatedTimeInMinutes = Math.round(this.acceptRide.estimatedTimeInMinutes * 100) / 100;
          this.waitingForRide = false;
          this.rideService.setActiveRide(true);
          this.vehicleService.simulateRide(this.acceptRide.id).subscribe({
            next: (result) => {
            },
            error: (error) => {
            }
          });

        } else if (this.acceptRide.status === "REJECTED" || this.acceptRide.status == "CANCELED") {
          alert('Your ride was rejected');
          this.clearMap();
          this.rideAssumption.estimatedCost = 0;
          this.rideAssumption.estimatedTimeInMinutes = 0;
          this.waitingForRide = false;
          this.rideAccepted = false;
        }
      }
    }

    );
    this.stompClient.subscribe('/topic/passenger/start-ride/' + this.id, (message: { body: string; }) => {
      let ride = JSON.parse(message.body);
      this.rideService.setRideStarted(true);
      this.rideService.setRideEnded(false);

      this.vehicleService.simulateRide(ride.id).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        }
      });
      console.log(message);
    });

    this.stompClient.subscribe('/topic/passenger/end-ride/' + this.id, (message: { body: string; }) => {
      let ride = JSON.parse(message.body);
      console.log(message.body);
      this.rideService.setRideEnded(true);
      this.vehicleService.get(ride.driver.id).subscribe({
        next: (result) => {
          this.vehicles[result.id].setIcon(greenCar);
          this.rideService.setActiveRide(false);
          this.rideService.setRideAccepted(false);
          this.rideService.setRideStarted(false);
          this.router.navigate(['/ride-rating/' + ride.id]);

        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  }

  private setDriverSockets() {
    this.stompClient.subscribe('/topic/panic/' + this.id, (message: { body: string }) => {
      let ride = JSON.parse(message.body);
      this.vehicleService.get(ride.driver.id).subscribe({
        next:(result) =>{
          this.vehicles[result.id].setIcon(carPanic);
        },
        error:(error) =>{
            console.log(error);
        }
      });

  });
    this.stompClient.subscribe('/topic/driver/ride/' + this.id, (message: { body: string; }) => {
      console.log(message);
      this.rideService.setRideEnded(false);

      this.rideService.setRideStatus(false);
      this.acceptRide = JSON.parse(message.body);
      this.acceptRide.estimatedTimeInMinutes = Math.round(this.acceptRide.estimatedTimeInMinutes * 100) / 100;
      this.acceptNotification = true;
    });
    this.stompClient.subscribe('/topic/driver/start-ride/' + this.id, (message: { body: string; }) => {
      let ride = JSON.parse(message.body);
      this.rideService.setRideEnded(false);

      this.rideService.setRideStarted(true);
      this.vehicleService.simulateRide(ride.id).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        }
      });
      console.log(message);
    });

    this.stompClient.subscribe('/topic/driver/end-ride/' + this.id, (message: { body: string; }) => {
      let ride = JSON.parse(message.body);
      this.rideService.setRideEnded(true);
      this.vehicleService.get(ride.driver.id).subscribe({
        next: (result) => {
          this.vehicles[result.id].setIcon(greenCar);
          this.rideAccepted = false;
          this.rideService.setActiveRide(false);
          this.router.navigate['/driverRideHistory'];
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  }

  private setAdminSockets() {
    if (this.role === 'ADMIN') {
      this.stompClient.subscribe('/topic/admin/panic/' + this.id, (message: { body: string; }) => {
        let ride = JSON.parse(message.body);
        this.vehicleService.get(ride.driver.id).subscribe({
          next: (result) => {
            this.vehicles[result.id].setIcon(carPanic);
          },
          error: (error) => {
            console.log(error);
          }
        });
      });

      this.stompClient.subscribe('/topic/admin/end-ride/' + this.id, (message: { body: string; }) => {
        let ride = JSON.parse(message.body);

        this.rideService.setRideEnded(true);
        console.log(message.body);
        this.vehicleService.get(ride.driver.id).subscribe({
          next: (result) => {
            this.vehicles[result.id].setIcon(greenCar);
            this.rideService.setActiveRide(false);
            this.rideService.setRideAccepted(false);

            this.rideService.setRideStarted(false);

          },
          error: (error) => {
            console.log(error);
          }
        });
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.249101856630546, 19.848034],
      zoom: 16,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

  }

  showDateTimePicker(): void {
    if (this.showDateTime) {
      this.scheduledTime = null;
      this.showDateTime = false;
    }
    else this.showDateTime = true;
  }

  selectVehicleType(type: VehicleType): void {
    this.selectedVehicleName = type.name;
    this.showVehicleType = false;
    this.typeSelected = true;
  }

  ngOnDestroy(): void {
    if (this.map && this.map.remove) {
      this.map.off();
      this.map.remove();
    }
  }
  ngAfterViewInit(): void {

    this.rideService.panicPressedValue$.subscribe((value) =>{
      this.panicPressed = value;
      if(this.panicPressed !== null){
        this.vehicleService.get(value.driver.id).subscribe({
          next:(result) =>{
            this.vehicles[result.id].setIcon(carPanic);
          },
          error:(error) =>{
              console.log(error);
          }
        });
      }
    });
    this.rideService.rideEndedValue$.subscribe((value) =>{
      this.rideEnded = value;
    })
    this.rideService.isRideStarted$.subscribe((value) =>{
      if(value === true){
        if (this.currentRoute != null) {
          this.map.removeControl(this.currentRoute);
        }
        const route = L.Routing.control({
          waypoints: [L.latLng(this.acceptRide.locations[0].departure.latitude, this.acceptRide.locations[0].departure.longitude),
          L.latLng(this.acceptRide.locations[0].destination.latitude, this.acceptRide.locations[0].destination.longitude)],
          show: false,
          routeWhileDragging: true,
        }).addTo(this.map);
        this.currentRoute = route;
      }
    })

    this.rideService.rideStatusChangedValue$.subscribe((value) => {
      this.rideDeclined = value;
    });
    this.rideService.rideAcceptedValue$.subscribe((value) =>{
      this.rideAccepted = value;
    })
    this.rideService.activeRideValue$.subscribe((value) =>{
      this.rideAccepted = value;
      if (this.currentRoute != null) {
        this.map.removeControl(this.currentRoute);
      }
      if(this.rideAccepted == true){
          if (this.currentRoute != null) {
            this.map.removeControl(this.currentRoute);
          }
          const route = L.Routing.control({
            waypoints: [L.latLng(this.acceptRide.locations[0].departure.latitude, this.acceptRide.locations[0].departure.longitude),
            L.latLng(this.acceptRide.locations[0].destination.latitude, this.acceptRide.locations[0].destination.longitude)],
            show: false,
            routeWhileDragging: true,
          }).addTo(this.map);
          this.currentRoute = route;
      }
    })
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconAnchor: [15, 30]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

    if(this.isOnlyMap) {
      if(this.destinationRideInfo !== '' && this.departureRideInfo !== ''){
        this.search(this.departureRideInfo);
        this.search(this.destinationRideInfo, true);
      }
      return;
    }
    this.initializeWebSocketConnection();
    this.initializeWebSocketSimulationConnection();


    this.registerOnClick();


    this.vehicleService.getVehicleTypes()
      .subscribe(
        (vehicleTypes) => (this.vehicleTypes = vehicleTypes)
      );

    this.rideService.getFavoriteRides()
    .subscribe(
      (rides) => (this.favoriteRides = rides)
    );

    // get all vehicles not in an active ride currently
    // then simulate their pins

    this.rideService.getAllActiveRidesWithIds().subscribe({
      next:(result) =>{
        console.log(result);
          for(const rideLoc of result){
            if(this.vehicles[rideLoc.vehicleId] && this.acceptRide.id !== rideLoc.rideId){
                this.vehicles[rideLoc.vehicleId].setIcon(redCar);
            }
          }

      },
      error:(error) =>{

      }
    })
    this.vehicleService.getAllLocations()
                        .subscribe(
                          (locations) => {
                            this.vehicleLocations = locations;
                            for(const location of this.vehicleLocations){

                              if(location.available === true){

                                const vehicleMarker = L.marker([location.latitude, location.longitude],
                                  {icon:greenCar}).addTo(this.map);
                                this.vehicles[location.id] = vehicleMarker;
                              }else{
                                const vehicleMarker = L.marker([location.latitude, location.longitude], {icon:redCar}).addTo(this.map);
                                this.vehicles[location.id] = vehicleMarker;
                              }

                            }
                          }
                        );
    if(this.destinationRideInfo !== '' && this.departureRideInfo !== ''){
      this.search(this.departureRideInfo);
      this.search(this.destinationRideInfo, true);
    }

  }

  search(address: string, isSecond = false) {

    this.mapService.search(address).subscribe(
      {
        next: (result) => {
          if (this.markers.length != 2) {
            this.markers.push(result[0]);
          }
          if (isSecond && this.markers.length == 2) {
            const departure = this.markers[0];
            const destination = this.markers[1];
            const route = L.Routing.control({
              waypoints: [L.latLng(departure.lat, departure.lon), L.latLng(destination.lat, destination.lon)],
              show: false,
              routeWhileDragging: true,
            }).addTo(this.map);
            const bounds = L.latLngBounds(this.markers);
            this.map.fitBounds(bounds);
            this.currentRoute = route;


            this.getRideAssumptions();
          }
        },
        error: () => { console.log("Mistakes were made.."); }
      }
    );
    if (this.currentRoute != null) {
      this.map.removeControl(this.currentRoute);
    }

  }

  closeRideInfo(): void {
    this.showGetRide = false;
  }

  getRideAssumptions(): void {

    const route = new Array<Route>();
    const selectedLocations = new Array<Location>();
    const depLoc: Location = {
      address: this.getRideForm.value.departure,
      latitude: this.markers[0].lat,
      longitude: this.markers[0].lon
    };
    const destLoc: Location = {
      address: this.getRideForm.value.destination,
      latitude: this.markers[1].lat,
      longitude: this.markers[1].lon

    };
    selectedLocations.push(depLoc);
    selectedLocations.push(destLoc);
    route.push({
      departure: depLoc,
      destination: destLoc
    })
    let type = "VAN";
    if (this.selectedVehicleName === "STANDARD") {
      type = "STANDARD";
    }
    else if (this.selectedVehicleName === "LUXURY") {
      type = "LUXURY";
    }
    const rideInfo: RideInfoBody = {
      locations: route,
      vehicleType: type,
      babyTransport: this.getRideForm.value.babyTransport,
      petTransport: this.getRideForm.value.petTransport

    };
    console.log(rideInfo)
    this.userService.getRideAssumption(rideInfo)
      .subscribe(
        (info) => { this.rideAssumption = info; console.log(info) }
      );

  }


  registerOnClick(): void {

    this.map.on('click', (e: any) => {
      if (this.showGetRide && this.markers.length != 2) {
        const coord = e.latlng;
        const lat = coord.lat;
        const lng = coord.lng;
        this.mapService.reverseSearch(lat, lng).
          subscribe(
            (res) => {

              if ((this.markers.length != 2 && this.getRideForm.value.departure == "")) {
                this.getRideForm.patchValue({
                  departure: res.display_name
                });
              }
              else {
                if (this.getRideForm.value.destination == "") {
                  this.getRideForm.patchValue({
                    destination: res.display_name
                  });
                }
              }
            }
          );
      }
      if (!this.showGetRide) {
        alert("Click on the get ride button first!");
      }
      if (this.markers.length == 2) {
        alert("Already selected 2 locations!");
      }

    });


  }

  openGetRide(): void {
    this.showGetRide = true;
  }

  clearMap(): void {
    this.deleteMarkers();
    this.map.removeControl(this.currentRoute);
    this.getRideForm.patchValue(
      {
        departure: "",
        destination: ""
      }
    );

  }

  deleteMarkers(): void {


    this.map.eachLayer(
      (layer) => {
        if (layer.options.waypoints && layer.options.waypoints.length) {
          this.map.removeLayer(layer);
        }
      });
    this.markers.length = 0;

  }
  getRide(): void {


    if (!this.getRideForm.valid) {
      this.isFormValid = false;
      return;
    }
    if (this.selectedVehicleName === '') {
      this.isFormValid = false;
      return;
    }
    this.isFormValid = true;
    if (this.getRideForm.value.departure === this.getRideForm.value.destination) {
      alert("Destination and departure must be different!");
      return;
    }

    this.deleteMarkers();

    this.search(this.getRideForm.value.departure);
    this.search(this.getRideForm.value.destination, true);
    document.getElementById("map").focus();


    this.splitPassengers = this.getRideForm.value.passengers.split(',');
    this.showGetRide = false;

  }

  openVehicleTypeComponent(): void {
    this.showVehicleType = !this.showVehicleType;
    this.typeSelected = false;
  }

  async confirmRideOrder(): Promise<void> {
    const passengers = new Array<UserRestrict>();
    let arePassengerdValid = true;
    if (this.splitPassengers.length > 0 && this.splitPassengers[0].trim() !== '') {
      for (let passenger of this.splitPassengers) {
        passenger = passenger.trim();
        try {
          const result = await this.userService.findByEmail(passenger).toPromise();
          passengers.push({
            id: result.id,
            email: result.email
          });
          console.log(result);
        } catch (error) {
          console.log(error);
          arePassengerdValid = false;
        }
      }
      if (!arePassengerdValid) {
        alert("Wrong email!");
        return;
      }
    }
    const route = new Array<Route>();
    const selectedLocations = new Array<Location>();
    const depLoc: Location = {
      address: this.getRideForm.value.departure,
      latitude: this.markers[0].lat,
      longitude: this.markers[0].lon
    };
    const destLoc: Location = {
      address: this.getRideForm.value.destination,
      latitude: this.markers[1].lat,
      longitude: this.markers[1].lon

    };
    selectedLocations.push(depLoc);
    selectedLocations.push(destLoc);
    route.push({
      departure: depLoc,
      destination: destLoc
    })
    if (this.showDateTime) {

      this.scheduledTime = this.getRideForm.value.scheduledTime;
    }
    const ride: CreateRideDTO = {
      passengers: passengers,
      babyTransport: this.getRideForm.value.babyTransport,
      petTransport: this.getRideForm.value.petTransport,
      locations: route,
      vehicleType: this.selectedVehicleName,
      scheduledTime: this.scheduledTime
    }
    this.rideDeclined = false;
    this.acceptNotification = false;
    this.rideService.orderARide(ride).subscribe({
      next: (result) => {
        this.acceptNotification = true;
        this.waitingForRide = true;
      },
      error: (error) => {
        console.log(error);
        alert('Cannot create ride. You already have one in progress.');
      }
    });

  }

  openFavoriteRides(){
    this.showFavoriteRides = !this.showFavoriteRides;
  }

  selectFavoriteRide(favRide: FavoriteRide){
    let passengersEmails = "";
    favRide.passengers.forEach(element => {
      if(element.id != this.id)
        passengersEmails += element.email + ",";
    });
    passengersEmails = passengersEmails.slice(0, -1);
    this.showFavoriteRides = false;
    this.getRideForm.patchValue({
      departure: favRide.locations[0].departure.address,
      destination: favRide.locations[0].destination.address,
      passengers: passengersEmails,
      babyTransport: favRide.babyTransport,
      petTransport: favRide.petTransport,
      scheduled: false,
      scheduledTime: new Date()
    });

    this.vehicleTypes.forEach(element => {
      if(element.name===favRide.vehicleType)
        this.selectVehicleType(element);
    });
  }
}
