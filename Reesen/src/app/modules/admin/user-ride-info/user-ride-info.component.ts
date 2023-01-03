import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ride } from 'src/app/models/Ride';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-user-ride-info',
  templateUrl: './user-ride-info.component.html',
  styleUrls: ['./user-ride-info.component.css']
})
export class UserRideInfoComponent implements OnInit{

  userId: number;
  rideId: number;
  ride: Ride;
  hasLoaded: boolean = false;

  constructor(private route: ActivatedRoute,
              private rideService: RideService){ }

  ngOnInit(): void {

    this.hasLoaded = false;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.rideId = +this.route.snapshot.paramMap.get('rideId');


    this.setRide();

  }

  private setRide():void{
      this.rideService.get(this.rideId)
          .subscribe(
            {
              next: (result) =>{ this.ride = result;console.log(this.ride);this.hasLoaded = true;},
              error: (error) => {console.log(error);}
            }
          )
  }
}
