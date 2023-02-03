import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MapService } from '../../map/map.service';
import * as L from 'leaflet';
import { PassengerService } from "../passenger.service";
import { Passenger } from "../../../models/Passenger";
import { Review, Ride, CreateFavoriteRide } from "../../../models/Ride";
import { RideService } from "../../services/ride.service";
import { DriverService } from '../../driver/services/driver.service';
import { ReviewService } from '../../driver/services/review.service';
import { Driver } from 'src/app/models/Driver';

@Component({
  selector: 'app-passengers-ride',
  templateUrl: './passengers-ride.component.html',
  styleUrls: ['./passengers-ride.component.css']
})
export class PassengersRideComponent implements AfterViewInit, OnDestroy {
  constructor(private route: ActivatedRoute,
    private driverService: DriverService,
    private rideService: RideService,
    private router: Router,
    private reviewService: ReviewService,
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef,
    private passengerService: PassengerService,
    private reviewSerice: ReviewService) {
  }

  ride: Ride;
  passengers = new Array<Passenger>;
  reviews = new Array<Review>;
  ratings: number = 4;
  hasLoaded: boolean = false;
  userId: number;
  rideId: number;
  driver: Driver;
  userRole: string;
  map!: L.Map;
  showRate: boolean = false;

  departureRideInfo = '';
  destinationRideInfo = '';
  isOnlyMap = true;
  favoriteRideName:string;
  openFavBox: boolean = false;


  ngAfterViewInit(): void {

    this.hasLoaded = false;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.rideId = +this.route.snapshot.paramMap.get('rideId');
    this.userRole = this.route.snapshot.paramMap.get('role');


    this.setRide();


  }

  private setRide(): void {
    this.rideService.get(this.rideId)
      .subscribe(
        {
          next: (result) => {
            this.ride = result;
            this.departureRideInfo = this.ride.locations[0].departure.address;
            this.destinationRideInfo = this.ride.locations[0].destination.address;
            this.reviewService.getReviewsForTheSpecificRide(this.rideId).subscribe(
              {
                next: (res) => {
                  this.reviews = res;
                  this.setRatings();
                  this.setDriver();
                  this.setPassengers();
                },
                error: (err) => {
                  console.log(err);
                }
              }
            )


          },
          error: (error) => { console.log(error); }
        }
      )
  }



  private setDriver(): void {
    this.driverService.get(this.ride.driver.id)
      .subscribe(
        {
          
          next: (result) => { this.driver = result; },
          error: (error) => { console.log(error); }
        }
      )
  }


  private setPassengers(): void {
    for (let i = 0; i < this.ride.passengers.length; i++) {
      this.passengerService.get(this.ride.passengers[i].id)
        .subscribe(
          {
            next: (result) => {
              this.passengers.push(result);
              this.setReviewInfo(i, result);
              if (i === this.ride.passengers.length - 1) {
                this.changeDetectorRef.detectChanges();
                this.hasLoaded = true;
              }

            },
            error: (error) => { console.log(error); }
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

  private setRatings(): void {

    let reviews: Review[] = this.reviews;
    if (reviews.length === 0) {
      this.ratings = 0;
      var threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      if (new Date(this.ride.endTime) > threeDaysAgo) {
        this.showRate = true;

        return;
      }
    }
    this.showRate = false;
    let totalNumberOfReviews: number = reviews.length * 2;
    let totalReviewScore: number = 0;
    for (let j = 0; j < reviews.length; j++) {

      let vehicleReview = reviews[j].vehicleReview;
      let driverReview = reviews[j].driverReview;
      totalReviewScore += vehicleReview.rating;
      totalReviewScore += driverReview.rating;
    }

    this.ratings = totalReviewScore / totalNumberOfReviews;
  }
  goBack(): void {
    this.router.navigate(['/passenger_ride-history']);
  }

  ngOnDestroy(): void {

  }


  openBox() {
    this.openFavBox = true;
  }

  orderRide() {

  }

  rateRide() {
    this.router.navigate(['/ride-rating/'+this.ride.id]);

    this.setRatings();
  }

  addFavoriteRide() {
    this.openFavBox = false;
    const fav: CreateFavoriteRide = {
      favoriteName: this.favoriteRideName,
      babyTransport: this.ride.babyTransport,
      petTransport: this.ride.petTransport,
      locations: this.ride.locations,
      passengers: this.ride.passengers,
      vehicleType: this.ride.vehicleType,
    }
    this.rideService.addFavoriteRide(fav).subscribe(
      {
        next: (result) => {
          console.log(result);
        },
        error: (error) => { console.log(error); }
      }
    );
  }
}
