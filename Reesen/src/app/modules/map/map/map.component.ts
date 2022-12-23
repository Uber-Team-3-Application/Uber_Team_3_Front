import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleType } from 'src/app/models/Vehicle';
import { Location } from 'src/app/models/Location';
import { VehicleService } from 'src/app/modules/driver/services/vehicle.service';
import { UserService } from '../../unregistered-user/user.service';
import { RideInfo, RideInfoBody } from 'src/app/models/Ride';
import { greenCar } from '../icons/icons';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  private map:any;
  private currentRoute: L.Routing.Control | null = null;
  rideButtonText: string = 'Get Ride info';
  showGetRide: boolean = false;
  showVehicleType: boolean = false;
  vehicleTypes: VehicleType[];
  typeSelected: boolean = false;
  selectedVehicleName: string = '';
  isFormValid:boolean = true;
  isRideInfoOpened:boolean = false;
  rideAssumption: RideInfo = {
    estimatedTimeInMinutes: 0,
    estimatedCost: 0
  }

  vehicleLocations: Location[];

  markers = new Array();


  getRideForm = new FormGroup({
    departure: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destination : new FormControl('', [Validators.required, Validators.minLength(3)]),
    babyTransport: new FormControl(false),
    petTransport: new FormControl(false)
  });

  constructor(private mapService: MapService, 
    private vehicleService: VehicleService,
    private userService: UserService){}

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

  ngAfterViewInit(): void {


    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
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
                              L.marker([location.latitude, location.longitude], {icon:greenCar}).addTo(this.map);
                            }
                          }
                        );


  }

  search(address: string, isSecond:boolean = false){

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
    let type = "KOMBI";
    if(this.selectedVehicleName === "STANDARD"){
        type = "STANDARDNO";
    }
    else if(this.selectedVehicleName === "LUXURY"){
      type = "LUKSUZNO";
    }
     const rideInfo: RideInfoBody = {
      locations: selectedLocations,
      vehicleType:type,
      babyTransport: this.getRideForm.value.babyTransport,
      petTransport: this.getRideForm.value.petTransport
    
    };
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

    this.deleteMarkers();
   
    this.search(this.getRideForm.value.departure);
    this.search(this.getRideForm.value.destination, true);
    document.getElementById("map").focus();

    this.showGetRide = false;

  }

  openVehicleTypeComponent():void{
    this.showVehicleType = !this.showVehicleType; 
    this.typeSelected = false;
  }

}
