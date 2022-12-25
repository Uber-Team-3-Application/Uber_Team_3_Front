import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/Passenger';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
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
    address: '',
    password: '',
    active: true
  };
  

  constructor(private passengerService:PassengerService, private tokenDecoder: TokenDecoderService){

  }

  ngOnInit():void{
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    this.passengerService.get(tokenInfo.id).
    subscribe(
      (passenger) =>(this.passenger = passenger)
      );

  }
}