import { Component } from '@angular/core';
import * as L from "leaflet";
import {Ride} from "../../../models/Ride";
import {MapService} from "../../map/map.service";
import {ActivatedRoute} from "@angular/router";
import {VehicleService} from "../../driver/services/vehicle.service";
import {UserService} from "../../unregistered-user/user.service";
import {RideService} from "../../services/ride.service";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-passenger-current-ride',
  templateUrl: './passenger-current-ride.component.html',
  styleUrls: ['./passenger-current-ride.component.css']
})
export class PassengerCurrentRideComponent {

  private map:any;
  private currentRoute: L.Routing.Control | null = null;
  ride : Ride;
  isCardLoaded  = false;
  mm = 0;
  ss = 0;
  ms = 0;
  isRunning = false;
  timerId;
  isNotePressed = false;
  notePassengerForm = new FormGroup({
    inputNote: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });



  constructor(private mapService: MapService,
              private route: ActivatedRoute,
              private vehicleService: VehicleService,
              private userService: UserService,
              private rideService: RideService,
              private tokenDecoder: TokenDecoderService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.rideService.get(params["rideId"]).subscribe((ride)=> {
        this.ride = ride;
        this.isCardLoaded = true;
        this.initMap();
        this.clickHandler();
      })
    });
  }


  changeHandler(bool) {
    this.isNotePressed = bool;
  }

  sendNote() {
    if (this.notePassengerForm.valid) {
      // TODO: POSALJI UPOZORENJE CENTRALI
    } else {
      alert("Please input valid text message!")
    }
  }



  clickHandler() {

    if (!this.isRunning) {
      // Stop => Running
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms >= 100) {
          this.ss++;
          this.ms = 0;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0
        }
      }, 10);
    } else {
      clearInterval(this.timerId);
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }


  private initMap() :void{
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconAnchor: [15, 30]
    });

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

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

    let departure;
    let destination;
    this.mapService
      .search(this.ride.locations.at(0).departure.address)
      .subscribe(
        {
          next: (result) =>{
            departure = result[0];
          },
          error: (error) =>{console.log(error);}
        }
      );

    this.mapService
      .search(this.ride.locations.at(this.ride.locations.length - 1).destination.address)
      .subscribe(
        {
          next: (result) =>{
            destination = result[0];
            if(departure){
              L.Routing.control({
                waypoints: [L.latLng(departure.lat, departure.lon), L.latLng(destination.lat, destination.lon)],
                show: false,
              }).addTo(this.map);

              const bounds = L.latLngBounds([departure, destination]);
              this.map.fitBounds(bounds);
            }
          },
          error: (error) => {console.log(error);}
        }
      );
  }



}
