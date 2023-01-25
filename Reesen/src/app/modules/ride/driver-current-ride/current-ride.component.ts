import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import * as L from "leaflet";
import {MapService} from "../../map/map.service";
import {VehicleService} from "../../driver/services/vehicle.service";
import {UserService} from "../../unregistered-user/user.service";
import {RideService} from "../../services/ride.service";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";
import {VehicleType} from "../../../models/Vehicle";
import { carPanic, carMyRide } from '../../map/icons/icons';
import {Ride} from "../../../models/Ride";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit {
  private map:any;
  private currentRoute: L.Routing.Control | null = null;
  ride : Ride;
  isOnlyMap = false;
  isCardLoaded  = false;
  mm = 0;
  ss = 0;
  ms = 0;
  isRunning = false;
  isNotePressed = false;
  timerId;

  @Input() role: string;
  isRideStarted : boolean = true;
  vehicles: { [vehicleId: number]: L.Marker } = {};

  vehicle: {[vehicleId: number]: L.Marker} = {};

  notePassengerForm = new FormGroup({
    inputNote: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });


  constructor(private mapService: MapService,
              private route: ActivatedRoute,
              private router: Router,
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
        this.vehicleService.get(ride.driver.id).subscribe({
          next:(result) =>{
            this.vehicle[result.id].setIcon(carMyRide);
          }
        })
        this.initMap();
        this.clickHandler();

      })
      this.vehicleService.simulateRide(params["rideId"]).subscribe({
        next:(result) =>{console.log(result);},
        error:(error) =>{console.log(error);}
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

  finishRide() {
    this.clickHandler(); // zaustavi timer
    this.rideService.endRide(this.ride.id).subscribe({

      next:(result) =>{
          if(this.role==='DRIVER')
            this.router.navigate(['/']);
      },
      error:(error) =>{
          console.log(error);
      }
    });

  }

  startRide() {
      this.isRideStarted = true;
      this.isRunning = true;
      this.rideService.startRide(this.ride.id).subscribe({

        next:(result) =>{
          this.vehicleService.simulateRide(result.id).subscribe({
            next:(ress) =>{
              
                console.log(ress);
            },
            error:(err) =>{
              console.log(err);
            }
          })
        },
        error:(error) =>{
            console.log(error);
        }
      });
  }
}
