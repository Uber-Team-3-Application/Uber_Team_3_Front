import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/Passenger';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
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