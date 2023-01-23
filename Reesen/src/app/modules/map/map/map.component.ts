import { AfterViewInit, OnDestroy, Component, Input } from '@angular/core';
import {Observable} from 'rxjs'
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleType } from 'src/app/models/Vehicle';
import { Location, Route, VehicleLocationWithAvailibility } from 'src/app/models/Location';
import { VehicleService } from 'src/app/modules/driver/services/vehicle.service';
import { UserService } from '../../unregistered-user/user.service';
import { RideInfo, RideInfoBody, CreateRideDTO, RideSimulationDTO, VehicleSimulationDTO, Ride } from 'src/app/models/Ride';
import { UserRestrict } from 'src/app/models/User';
import { greenCar, redCar } from '../icons/icons';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import { RideService } from '../../services/ride.service';
//import * as Stomp from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import * as myStomp from 'stompjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy{

  private map:any;
  private currentRoute: L.Routing.Control | null = null;
  isDriver = false;
  rideButtonText = 'Get Ride info';
  showGetRide = false;
  showVehicleType = false;
  vehicleTypes: VehicleType[];
  typeSelected = false;
  selectedVehicleName = '';
  waitingForRide = false;

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

  vehicleLocations: VehicleLocationWithAvailibility[];

  markers = new Array();

  stompClient: any;

  vehicles: any = {};
  rides: any = {};
  mainGroup: L.LayerGroup[] = [];
  socketEndpoint = 'http://localhost:8082/socket';

  acceptNotification = false;
  acceptRide: Ride;

  initializeWebSocketConnection() {
    let ws = new SockJS(this.socketEndpoint);
    //this.stompClient = Stomp.Stomp.over(ws);
    
    this.stompClient = myStomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      console.log('da');
      that.openGlobalSocket();
    });
  

  }
  openGlobalSocket() {
    if(this.role==='DRIVER'){
      console.log(this.id);
      this.stompClient.subscribe('/topic/driver/ride/'+this.id, (message: {body: string}) =>{
        console.log(message);
        this.rideService.setRideStatus(false);
        this.acceptRide = JSON.parse(message.body);
        this.acceptNotification = true;
      });
    }else if(this.role==='PASSENGER'){
      this.stompClient.subscribe('/topic/passenger/ride/'+this.id, (message: {body: string}) =>{
        console.log(message);
        this.acceptRide = JSON.parse(message.body);
        if(this.acceptRide.status == "ACCEPTED") 
        {
          this.rideAccepted = true;
          this.waitingForRide = false;
        } else if(this.acceptRide.status == "REJECTED") 
        {

        }
      });
    }

  }

  
  

  getRideForm = new FormGroup({
    departure: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destination : new FormControl('', [Validators.required, Validators.minLength(3)]),
    passengers: new FormControl('', []),
    babyTransport: new FormControl(false),
    petTransport: new FormControl(false)
  });

  constructor(private mapService: MapService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private rideService: RideService,
    private tokenDecoder: TokenDecoderService){

      const tokenObservable = new Observable(subscriber => {
        subscriber.next(this.tokenDecoder.getDecodedAccesToken());

        window.addEventListener('storage', (event) => {
          subscriber.next(this.tokenDecoder.getDecodedAccesToken());
        });
      });

      tokenObservable.subscribe(token => {
        if(token !== null){
          this.decodedToken = token;
          this.id = + this.decodedToken.id;

          this.role = this.decodedToken.role[0]['authority'];
          console.log(this.role);
        }else{
          this.id = 0;
          this.role = '';
          console.log('LOGOUT');
        }
      });



    }

  private initMap():void{
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

  selectVehicleType(type:VehicleType):void{
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


    this.rideService.rideStatusChangedValue$.subscribe((value) => {
      this.rideDeclined = value;
    });
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconAnchor:[15, 30]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();


    this.initializeWebSocketConnection();


    this.registerOnClick();

    this.vehicleService.getVehicleTypes()
                        .subscribe(
                          (vehicleTypes) => (this.vehicleTypes = vehicleTypes)
                        );

    this.vehicleService.getAllLocations()
                        .subscribe(
                          (locations) => {
                            this.vehicleLocations = locations;
                            for(const location of this.vehicleLocations){
                              console.log(location);
                              if(location.available === true){
                                L.marker([location.latitude, location.longitude], {icon:greenCar}).addTo(this.map);
                              }else{
                                L.marker([location.latitude, location.longitude], {icon:redCar}).addTo(this.map);
                              }
                            }
                          }
                        );


  }

  search(address: string, isSecond = false){

    this.mapService.search(address).subscribe(
      {
        next: (result) =>{
          if(this.markers.length != 2){
            this.markers.push(result[0]);
          }
          if(isSecond && this.markers.length == 2)
          {
            const departure = this.markers[0];
            const destination = this.markers[1];
            const route = L.Routing.control({
                  waypoints:[L.latLng(departure.lat, departure.lon), L.latLng(destination.lat, destination.lon)],
                  show:false,
                }).addTo(this.map);
            const bounds = L.latLngBounds(this.markers);
            this.map.fitBounds(bounds);
            this.currentRoute = route;


            this.getRideAssumptions();
          }
        },
        error:() =>{ console.log("Mistakes were made..");}
      }
    );
    if(this.currentRoute != null){
      this.map.removeControl(this.currentRoute);
    }

  }

  closeRideInfo():void{
    this.showGetRide = false;
  }

  getRideAssumptions():void{

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
      departure:depLoc,
      destination:destLoc
    })
    let type = "VAN";
    if(this.selectedVehicleName === "STANDARD"){
        type = "STANDARD";
    }
    else if(this.selectedVehicleName === "LUXURY"){
      type = "LUXURY";
    }
     const rideInfo: RideInfoBody = {
      locations: route,
      vehicleType:type,
      babyTransport: this.getRideForm.value.babyTransport,
      petTransport: this.getRideForm.value.petTransport

    };
    console.log(rideInfo)
    this.userService.getRideAssumption(rideInfo)
      .subscribe(
        (info) => {this.rideAssumption = info;}
      );

  }


  registerOnClick(): void{

      this.map.on('click', (e:any) =>{
          if(this.showGetRide && this.markers.length != 2){
            const coord = e.latlng;
            const lat = coord.lat;
            const lng = coord.lng;
            this.mapService.reverseSearch(lat, lng).
            subscribe(
              (res) => {

                  if((this.markers.length != 2 && this.getRideForm.value.departure == "")){
                    this.getRideForm.patchValue({
                      departure:  res.display_name
                    });
                  }
                  else{
                    if(this.getRideForm.value.destination == ""){
                      this.getRideForm.patchValue({
                        destination:  res.display_name
                      });
                    }
                  }
              }
            );
          }
          if(!this.showGetRide){
            alert("Click on the get ride button first!");
          }
          if(this.markers.length == 2){
            alert("Already selected 2 locations!");
          }

      });


  }

  openGetRide():void{

    this.showGetRide = true;

  }

  clearMap():void{
    this.deleteMarkers();
    this.map.removeControl(this.currentRoute);
    this.getRideForm.patchValue(
      {departure: "",
      destination: ""}
    );

  }

  deleteMarkers():void{


    this.map.eachLayer(
      (layer) =>
      {
        if (layer.options.waypoints && layer.options.waypoints.length) {
          this.map.removeLayer(layer);
         }
      });
    this.markers.length = 0;

  }
  getRide():void{


    if(!this.getRideForm.valid){
      this.isFormValid = false;
      return;
    }
    if(this.selectedVehicleName === ''){
      this.isFormValid = false;
      return;
    }
    this.isFormValid = true;
    if(this.getRideForm.value.departure === this.getRideForm.value.destination){
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

  openVehicleTypeComponent():void{
    this.showVehicleType = !this.showVehicleType;
    this.typeSelected = false;
  }

  async confirmRideOrder(): Promise<void> {
    const passengers = new Array<UserRestrict>();
    let arePassengerdValid = true;
    if(this.splitPassengers.length > 0 && this.splitPassengers[0].trim()!==''){
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
      departure:depLoc,
      destination:destLoc
    })
    const ride: CreateRideDTO = {
      passengers: passengers,
      babyTransport: this.getRideForm.value.babyTransport,
      petTransport: this.getRideForm.value.petTransport,
      locations: route,
      vehicleType: this.selectedVehicleName
    }
    this.rideDeclined = false;
    this.acceptNotification = false;
    this.rideService.orderARide(ride).subscribe();
    this.acceptNotification = true;
    this.waitingForRide = true;
  }

}
