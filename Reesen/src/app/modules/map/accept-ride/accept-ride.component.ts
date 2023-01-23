import { Component, Input, OnInit } from '@angular/core';
import { Ride } from 'src/app/models/Ride';
import { RideService } from '../../services/ride.service';


@Component({
  selector: 'app-accept-ride',
  templateUrl: './accept-ride.component.html',
  styleUrls: ['./accept-ride.component.css']
})
export class AcceptRideComponent implements OnInit{

  @Input() acceptRide: Ride;
  @Input() role: string;
  rideDeclined = false;
  constructor(private rideService: RideService){}
  acceptRideOrder(){

  }
  ngOnInit(): void {
    this.rideService.rideStatusChangedValue$.subscribe((rideDeclined) => {
      this.rideDeclined = rideDeclined;
    });
    console.log(this.role);
  }
  declineRide(){
  
    this.rideService.cancelRide(this.acceptRide.id, 'Ma lik je debil').subscribe({
        next:(result) =>{
          console.log(result);
          this.rideDeclined = true;
          this.rideService.setRideStatus(this.rideDeclined);
        },
        error:(error) =>{console.log(error);}
    });
    
    
  }
}
