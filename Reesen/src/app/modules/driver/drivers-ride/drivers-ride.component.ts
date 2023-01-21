import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DriverService} from "../services/driver.service";

import {ReviewService} from "../services/review.service";
import {MapService} from '../../map/map.service';
import * as L from 'leaflet';
import {PassengerService} from "../../passenger/passenger.service";
import {Passenger} from "../../../models/Passenger";
import {Review} from "../../../models/Ride";
import {Ride} from "../../../models/Ride";
import {RideService} from "../../services/ride.service";

@Component({
  selector: 'app-drivers-ride',
  templateUrl: './drivers-ride.component.html',
  styleUrls: ['./drivers-ride.component.css']
})
export class DriversRideComponent implements OnInit{
  constructor(private route: ActivatedRoute,
              private driverService : DriverService,
              private rideService : RideService,
              private router: Router,
              private reviewService : ReviewService,
              private mapService: MapService,
              private changeDetectorRef: ChangeDetectorRef,
              private passengerService : PassengerService) {
  }

  ride : Ride;
  passengers = new Array<Passenger>;
  reviews = new Array<Review>;
  ratings : number = 4;
  hasLoaded : boolean = false;
  userId: number;
  rideId: number;
  userRole: string;
  map!: L.Map;


  ngOnInit() : void {
    this.route.params.subscribe((params) => {
      this.rideService.get(params["rideId"]).subscribe((ride)=>
      {
        this.ride = ride;
        this.setReviews();
        this.setRatings();
        this.setPassengers();

      })

    })
  }

  private setReviews() {
    this.reviewService.getReviewsForTheSpecificRide(this.ride.id).subscribe(
      res => {
        this.reviews = res;
      }
    );
  }


  private setPassengers(): void{
    let indicator = 0;
    for(let i=0;i<this.ride.passengers.length;i++){
      this.passengerService.get(this.ride.passengers[i].id)
        .subscribe(
          {
            next: (result) =>{
              this.passengers.push(result);
              this.setReviewInfo(i, result);
              if(i===this.ride.passengers.length - 1){
                this.changeDetectorRef.detectChanges();
                this.initMap();
                this.hasLoaded = true;
              }

            },
            error: (error) => {console.log(error);}
          }
        );
    }

  }

  private setReviewInfo(i: number, result: Passenger) {
    for (let j = 0; j < this.reviews.length; j++) {
      if (this.ride.passengers[i].id === this.reviews[j].driverReview.passenger.id) {
        this.reviews[j].driverReview.passenger.profilePicture = result.profilePicture;
        this.reviews[j].driverReview.passenger.name = result.name;
        this.reviews[j].driverReview.passenger.surname = result.surname;
      }
      if (this.ride.passengers[i].id === this.reviews[j].vehicleReview.passenger.id) {
        this.reviews[j].vehicleReview.passenger.profilePicture = result.profilePicture;
        this.reviews[j].vehicleReview.passenger.name = result.name;
        this.reviews[j].vehicleReview.passenger.surname = result.surname;
      }
    }
  }

  private setRatings(): void{

    let reviews: Review[] = this.reviews;
    if(reviews.length === 0)
    {
      this.ratings = 0;
      return;
    }
    let totalNumberOfReviews: number = reviews.length  * 2;
    let totalReviewScore: number = 0;
    for(let j =0;j<reviews.length;j++){

      let vehicleReview = reviews[j].vehicleReview;
      let driverReview = reviews[j].driverReview;
      totalReviewScore += vehicleReview.rating;
      totalReviewScore += driverReview.rating;
    }

    this.ratings = totalReviewScore/ totalNumberOfReviews;
  }
  goBack():void{
    this.router.navigate(['users/' + this.userId + '/' + this.userRole + '/ride-history']);
  }


  private initMap():void{

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
          error: (error) =>{console.log(error);}
        }
      );


  }
}
