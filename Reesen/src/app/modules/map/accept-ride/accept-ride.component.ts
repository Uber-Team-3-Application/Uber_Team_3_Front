import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { Ride } from 'src/app/models/Ride';


@Component({
  selector: 'app-accept-ride',
  templateUrl: './accept-ride.component.html',
  styleUrls: ['./accept-ride.component.css']
})
export class AcceptRideComponent implements OnInit{

  @Input() acceptRide: Ride;
  @Input() role: string;
  rideDeclined = false;

  constructor(){}
  acceptRideOrder(){

  }
  ngOnInit(): void {
    console.log(this.role);
  }
  declineRide(){
    this.rideDeclined = true;
  }
}
