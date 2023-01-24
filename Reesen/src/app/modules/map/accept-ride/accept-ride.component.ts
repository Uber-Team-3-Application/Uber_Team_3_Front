import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  rejectionForm = new FormGroup({
    reason: new FormControl('', [Validators.required]),
  });

  constructor(private rideService: RideService){}
  acceptRideOrder(){

    this.rideService.acceptRide(this.acceptRide.id, this.acceptRide).subscribe({
      next:(result) =>{
        console.log(result);
        this.rideService.setRideStatus(true);
        this.rideService.setActiveRide(true);
      },
      error:(error) =>{console.log(error);}
  });

  }
  ngOnInit(): void {
    this.rideService.rideStatusChangedValue$.subscribe((rideDeclined) => {
      this.rideDeclined = rideDeclined;
    });
    console.log(this.role);
  }


  submitRideRejection(){
    this.rideService.cancelRide(this.acceptRide.id, this.rejectionForm.value.reason).subscribe({
      next:(result) =>{
        console.log(result);
        this.rideService.setRideStatus(this.rideDeclined);
      },
      error:(error) =>{console.log(error);}
  });
  }

  declineRide(){
    this.rideDeclined = true;
    
  }
}
