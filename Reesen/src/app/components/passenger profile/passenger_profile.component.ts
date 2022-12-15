import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/Passenger';
import { PassengerService } from 'src/app/services/passenger/passenger.service';

@Component({
  selector: 'app-passenger_profile',
  templateUrl: './passenger_profile.component.html',
  styleUrls: ['./passenger_profile.component.css']
})
export class PassengerProfileComponent implements OnInit {
  passenger:Passenger = {
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    email: '',
    address: ''
  };
  

  constructor(private passengerService:PassengerService){

  }

  ngOnInit():void{
    this.passengerService.get(3).
    subscribe(
      (passenger) =>(this.passenger = passenger)
      );

  }
}