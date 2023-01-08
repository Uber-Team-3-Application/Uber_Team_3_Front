import {AfterViewInit, Component} from '@angular/core';
import * as L from "leaflet";
import {MapService} from "../../map/map.service";
import {VehicleService} from "../../driver/services/vehicle.service";
import {UserService} from "../../unregistered-user/user.service";
import {greenCar, redCar} from "../../map/icons/icons";
import {Location, VehicleLocationWithAvailibility} from "../../../models/Location";
import {RideInfoBody} from "../../../models/Ride";
import {VehicleType} from "../../../models/Vehicle";

@Component({
  selector: 'app-ride-map',
  templateUrl: './ride-map.component.html',
  styleUrls: ['./ride-map.component.css']
})
export class RideMapComponent implements AfterViewInit {

  private map: any;
  private currentRoute: L.Routing.Control | null = null;
  showGetRide: boolean = false;
  vehicleLocations: VehicleLocationWithAvailibility[];
  vehicleTypes: VehicleType[];

  markers = new Array();

  constructor(private mapService: MapService,
              private vehicleService: VehicleService,
              private userService: UserService) {
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


  ngAfterViewInit(): void {

    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();

  }



}
