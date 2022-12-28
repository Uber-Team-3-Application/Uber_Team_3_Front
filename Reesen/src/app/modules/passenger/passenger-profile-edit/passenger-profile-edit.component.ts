import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/Passenger';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-profile-edit',
  templateUrl: './passenger-profile-edit.component.html',
  styleUrls: ['./passenger-profile-edit.component.css']
})
export class PassengerProfileEditComponent implements OnInit{
  editForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)])
      
  });
  hasError: boolean;
  avatarBase64: string = "";
  passenger:Passenger = {
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    password: '',
    email: '',
    address: '',
    isConfirmedEmail:true,
    active: true
  }
  constructor(private passengerService: PassengerService, private router: Router, private tokenDecoder: TokenDecoderService){  
  }

  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    
    this.passengerService.get(tokenInfo.id)
    .subscribe(
      (passenger) => {this.passenger = passenger; console.log(this.passenger.password)}
    );

  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.avatarBase64 = reader.result.toString();
        this.passenger.profilePicture = this.avatarBase64;
    };
  }

  edit():void{
     if(this.editForm.valid){
      this.hasError = false;
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
      this.passengerService.edit(this.passenger, tokenInfo.id)
          .subscribe(
            (res) => {console.log(res);}
          )
      alert("Succesfully changed information!");
      this.router.navigate(['/passenger_profile'])
      

     }else{
      this.hasError = true;
     }
     
  }
}
