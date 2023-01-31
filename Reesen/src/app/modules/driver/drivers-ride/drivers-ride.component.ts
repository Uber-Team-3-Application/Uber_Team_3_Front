import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DriverService} from "../services/driver.service";

import {ReviewService} from "../services/review.service";
import {MapService} from '../../map/map.service';
import * as L from 'leaflet';
import {PassengerService} from "../../passenger/passenger.service";
import {Passenger} from "../../../models/Passenger";
import {Review, Ride} from "../../../models/Ride";
import {RideService} from "../../services/ride.service";

@Component({
  selector: 'app-drivers-ride',
  templateUrl: './drivers-ride.component.html',
  styleUrls: ['./drivers-ride.component.css']
})
export class DriversRideComponent implements OnInit{
  ride : Ride;
  passengers = new Array<Passenger>;
  reviews = new Array<Review>;
  ratings  = 4;
  hasLoaded  = false;
  isOnlyMap  = true;
  departureRideInfo = '';
  destinationRideInfo = '';
  userId: number;
  rideId: number;
  userRole: string;
  map!: L.Map;
  params : any;

  constructor(private route: ActivatedRoute,
              private driverService : DriverService,
              private rideService : RideService,
              private router: Router,
              private reviewService : ReviewService,
              private mapService: MapService,
              private changeDetectorRef: ChangeDetectorRef,
              private passengerService : PassengerService) {}


  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.setRide(params);
    });


  }

  async setRide(params)  {
    this.ride = await this.rideService.getPromiseRide(params["rideId"]);
    this.departureRideInfo = this.ride.locations[0].departure.address;
    this.destinationRideInfo = this.ride.locations[0].destination.address;
    await this.setReviews();
  }


  async setReviews() {
    this.reviews = await this.reviewService.getPromiseReviewsForTheSpecificRide(this.ride.id);
    this.setRatings();

  }


  private setPassengers(): void{
    for(let i=0;i<this.ride.passengers.length;i++){
      this.passengerService.get(this.ride.passengers[i].id)
        .subscribe(
          {
            next: (result) =>{
              this.passengers.push(result);
              this.setReviewInfo(i, result);
              if(i===this.ride.passengers.length - 1){
                this.changeDetectorRef.detectChanges();
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

    const reviews: Review[] = this.reviews;
    if(reviews.length === 0)
    {
      this.ratings = 0;
      return;
    }
    const totalNumberOfReviews: number = reviews.length  * 2;
    let totalReviewScore  = 0;
    for(let j =0;j<reviews.length;j++){

      const vehicleReview = reviews[j].vehicleReview;
      const driverReview = reviews[j].driverReview;
      totalReviewScore += vehicleReview.rating;
      totalReviewScore += driverReview.rating;
    }

    this.ratings = totalReviewScore/ totalNumberOfReviews;
    this.setPassengers();
  }
  goBack():void{
    this.router.navigate(['driverRideHistory']);
  }

  //  initMap() : boolean{
  //
  //   L.Marker.prototype.options.icon = L.icon({
  //     iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
  //   });
  //
  //     this.map = L.map('map', {
  //       center: [45.249101856630546, 19.848034],
  //       zoom: 16,
  //     });
  //
  //   const tiles = L.tileLayer(
  //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       maxZoom: 18,
  //       minZoom: 3,
  //       attribution:
  //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     }
  //   );
  //   tiles.addTo(this.map);
  //
  //   let departure;
  //   let destination;
  //   this.mapService
  //     .search(this.ride.locations.at(0).departure.address)
  //     .subscribe(
  //       {
  //         next: (result) =>{
  //           departure = result[0];
  //         },
  //         error: (error) =>{console.log(error);}
  //       }
  //     );
  //
  //   this.mapService
  //     .search(this.ride.locations.at(this.ride.locations.length - 1).destination.address)
  //     .subscribe(
  //       {
  //         next: (result) =>{
  //           destination = result[0];
  //           if(departure){
  //             L.Routing.control({
  //               waypoints: [L.latLng(departure.lat, departure.lon), L.latLng(destination.lat, destination.lon)],
  //               show: false,
  //             }).addTo(this.map);
  //
  //             const bounds = L.latLngBounds([departure, destination]);
  //             this.map.fitBounds(bounds);
  //           }
  //         },
  //         error: (error) => {console.log(error);}
  //       }
  //     );
  //   return true;
  // }
}
