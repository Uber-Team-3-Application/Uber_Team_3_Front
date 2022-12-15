import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from 'src/app/services/map/map.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleType } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{

  private map:any;
  rideButtonText: string = 'Get Ride info';
  showGetRide: boolean = false;
  showVehicleType: boolean = false;
  vehicleTypes: VehicleType[];
  typeSelected: boolean = false;
  selectedVehicleName: String = '';
  isFormValid:boolean = true;
  isRideInfoOpened:boolean = false;

  getRideForm = new FormGroup({
    departure: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destination : new FormControl('', [Validators.required, Validators.minLength(3)]),
    babyTransport: new FormControl(false),
    petTransport: new FormControl(false)
  });

  constructor(private mapService: MapService, private vehicleService: VehicleService){}

  private initMap():void{
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
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


    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

    this.vehicleService.getVehicleTypes()
                        .subscribe(
                          (vehicleTypes) => (this.vehicleTypes = vehicleTypes)
                        );
  }




  search(address: string){
    this.mapService.search(address).subscribe(
      {
        next: (result) =>{
          L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup(address)
          .openPopup();
          
        },
        error:() =>{}

      }
    );
    
  }

  closeRideInfo():void{
    this.showGetRide = false;
  }



  addMarker():void{
    const lat: number = 45.25;
    const lon: number = 19.8228;
    L.marker([lat, lon])
      .addTo(this.map)
        .bindPopup('Trenutno ste hier')
        .openPopup();
  }



  route():void{
    
    this.map.eachLayer((l) =>{
      if( l instanceof L.Marker )
        console.log(l);
    });
    //L.Routing.control({
   //   waypoints:[L.latLng(2, 2), L.latLng(2, 2)]
    //}).addTo(this.map);
    
  }

  registerOnClick(): void{
    this.map.on('click', (e:any) =>{
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).
      subscribe(
        (res) => {console.log(res.display_name);
        }
      );
        const mp = new L.Marker([lat, lng]).addTo(this.map);
        alert(mp.getLatLng());
    });
  }

  openGetRide():void{

    this.showGetRide = true;

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
   
    
    this.search(this.getRideForm.value.departure);
    this.search(this.getRideForm.value.destination);
    document.getElementById("map").focus();
    this.route();
    this.showGetRide = false;



  }

  openVehicleTypeComponent():void{
    this.showVehicleType = !this.showVehicleType; 
    this.typeSelected = false;
  }

}
