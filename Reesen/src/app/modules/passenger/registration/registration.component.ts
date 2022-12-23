import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/Passenger';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatedPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  hasError: boolean;
  avatarBase64: string = "";

  constructor(private passengerService: PassengerService, private router: Router){
    
  }

  get password() { return this.registerForm.get('password'); }
  get repeatedPassword() { return this.registerForm.get('repeatedPassword'); }

  register():void{
    if (this.password.value !== this.repeatedPassword.value) {
      this.hasError = true;
      alert("Passwords don't match");
      return;
    }
     if(this.registerForm.valid){
      this.hasError = false;
      alert("Succesfully registrated!");
      const passenger: Passenger = {
        name : this.registerForm.value.name,
        surname : this.registerForm.value.surname,
        profilePicture : this.avatarBase64,
        telephoneNumber : this.registerForm.value.phoneNumber,
        email : this.registerForm.value.email,
        address : this.registerForm.value.address,
        password : this.registerForm.value.password
      };
      console.log(passenger);
      this.passengerService.save(passenger).subscribe((res: any) => {
        console.log(res);
      });
      this.router.navigate(['/passenger_profile'])
     }else{
      this.hasError = true;
     }
     
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.avatarBase64 = reader.result.toString();
    };
  }
}
