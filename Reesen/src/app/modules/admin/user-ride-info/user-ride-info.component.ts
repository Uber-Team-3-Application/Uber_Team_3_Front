import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/Driver';
import { Passenger } from 'src/app/models/Passenger';
import { Review, Ride } from 'src/app/models/Ride';
import { DriverService } from '../../driver/services/driver.service';
import { PassengerService } from '../../passenger/passenger.service';
import { RideService } from '../../services/ride.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../../map/map.service';
import { ReviewService } from '../../driver/services/review.service';
@Component({
  selector: 'app-user-ride-info',
  templateUrl: './user-ride-info.component.html',
  styleUrls: ['./user-ride-info.component.css']
})
export class UserRideInfoComponent implements AfterViewInit, OnDestroy{
  
  userId: number;
  rideId: number;
  userRole: string;
  ride: Ride;
  hasLoaded = false;
  ratings = 0;
  driver: Driver;
  passengers = new Array<Passenger>;
  reviews = new Array<Review>;
  map!: L.Map;

  departureRideInfo = '';
  destinationRideInfo = '';
  isOnlyMap = true;


  constructor(private route: ActivatedRoute,
              private rideService: RideService,
              private driverService: DriverService,
              private passengerService: PassengerService,
              private router: Router,
              private mapService: MapService,
              private changeDetectorRef: ChangeDetectorRef,
              private reviewSerice: ReviewService){ }

  ngAfterViewInit(): void {

    this.hasLoaded = false;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.rideId = +this.route.snapshot.paramMap.get('rideId');
    this.userRole = this.route.snapshot.paramMap.get('role');


    this.setRide();
    
    
  }

  private setRide():void{
      this.rideService.get(this.rideId)
          .subscribe(
            {
              next: (result) =>{ 
                this.ride = result;
                this.departureRideInfo = this.ride.locations[0].departure.address;
                this.destinationRideInfo = this.ride.locations[0].destination.address;
                this.reviewSerice.getReviewsForTheSpecificRide(this.rideId).subscribe(
                  {
                    next:(res) =>{
                      this.reviews = res;
                      this.setRatings();
                      this.setDriver();
                      this.setPassengers();
                    },
                    error:(err) =>{
                      console.log(err);
                    }
                  }
                )

               
              },
              error: (error) => {console.log(error);}
            }
          )
  }

  private setDriver(): void{
    this.driverService.get(this.ride.driver.id)
        .subscribe(
          {
            next: (result) =>{this.driver = result; },
            error: (error) =>{console.log(error);}
          }
        )
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
                  this.hasLoaded = true;
                  this.changeDetectorRef.detectChanges();
                }
              
              },
              error: (error) =>{console.log(error);}
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
        let totalReviewScore = 0;
        for(let j =0;j<reviews.length;j++){

          const vehicleReview = reviews[j].vehicleReview;
          const driverReview = reviews[j].driverReview; 
          totalReviewScore += vehicleReview.rating;
          totalReviewScore += driverReview.rating;
        }
      
        this.ratings = totalReviewScore/ totalNumberOfReviews;
    }
  goBack():void{
    this.router.navigate(['users/' + this.userId + '/' + this.userRole + '/ride-history']);
  }
  ngOnDestroy(): void {

  }



}
