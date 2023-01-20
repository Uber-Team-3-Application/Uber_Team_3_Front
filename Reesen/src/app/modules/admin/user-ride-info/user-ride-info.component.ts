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
                  this.initMap();
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

  private initMap():void{
   

      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
        iconAnchor:[15, 30]
      });

      L.Marker.prototype.options.icon = DefaultIcon;

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
