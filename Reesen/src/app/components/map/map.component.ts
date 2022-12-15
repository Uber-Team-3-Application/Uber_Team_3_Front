import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from 'src/app/services/map/map.service';
import 'leaflet-routing-machine'
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

  getRideForm = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    destination : new FormControl('', [Validators.required]),
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

    //this.search();
    //this.addMarker();
    this.registerOnClick();
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

  search():void{
    this.mapService.search('Radnicka 19, Novi Sad').subscribe(
      {
        next: (result) =>{
          console.log(result);
          L.marker([result[0].lat, result[0].lon])
            .addTo(this.map)
            .bindPopup('Pozdrav iz Radnicke 19')
            .openPopup();
        },
        error:() =>{}

      }
    );
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
  getRide():void{
      this.showGetRide = !this.showGetRide;
  }



  openVehicleTypeComponent():void{
    this.showVehicleType = !this.showVehicleType; 
  }

}
