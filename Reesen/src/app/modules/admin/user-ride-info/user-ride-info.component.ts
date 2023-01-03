import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/Driver';
import { Passenger } from 'src/app/models/Passenger';
import { Review, Ride, SingleReview } from 'src/app/models/Ride';
import { DriverService } from '../../driver/services/driver.service';
import { PassengerService } from '../../passenger/passenger.service';
import { RideService } from '../../services/ride.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../../map/map.service';
@Component({
  selector: 'app-user-ride-info',
  templateUrl: './user-ride-info.component.html',
  styleUrls: ['./user-ride-info.component.css']
})
export class UserRideInfoComponent implements AfterViewInit{

  userId: number;
  rideId: number;
  userRole: string;
  ride: Ride;
  hasLoaded: boolean = false;
  ratings:number = 0;
  driver: Driver;
  passengers = new Array<Passenger>;
  reviews = new Array<Review>;
  map!: L.Map;



  constructor(private route: ActivatedRoute,
              private rideService: RideService,
              private driverService: DriverService,
              private passengerService: PassengerService,
              private router: Router,
              private mapService: MapService){ }

  ngAfterViewInit(): void {

    this.hasLoaded = false;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.rideId = +this.route.snapshot.paramMap.get('rideId');
    this.userRole = this.route.snapshot.paramMap.get('role');


    this.setRide();
    this.initMap();
    
  }

  private setRide():void{
      this.rideService.get(this.rideId)
          .subscribe(
            {
              next: (result) =>{ 
                this.ride = result;
                this.reviews = this.ride.reviews;
                this.setRatings();
                this.setDriver();
                this.setPassengers();
               
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

        let reviews: Review[] = this.ride.reviews;
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
   

      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
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
    
  }

}
