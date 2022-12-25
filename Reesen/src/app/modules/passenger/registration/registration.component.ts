import { verifyHostBindings } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailInfo } from 'src/app/models/Email';
import { Passenger } from 'src/app/models/Passenger';
import { UserService } from '../../unregistered-user/user.service';
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
  email: EmailInfo;
  avatarBase64: string = "";

  constructor(private passengerService: PassengerService, private userService: UserService, private router: Router){
    
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
      
     }else{
      this.hasError = true;
      alert("ne valja")
      const passenger: Passenger = {
        name : this.registerForm.value.name,
        surname : this.registerForm.value.surname,
        profilePicture : this.avatarBase64,
        telephoneNumber : this.registerForm.value.phoneNumber,
        email : this.registerForm.value.email,
        address : this.registerForm.value.address,
        password : this.registerForm.value.password,
        active : false
      };
      const passId = 3;
      console.log(passenger);
      this.passengerService.save(passenger).subscribe((res: any) => {
       console.log(res);
      });
      const activationHtml = "http://localhost:4200/activationPage?passengerId=" + passId;
      const htmlString = JSON.stringify(`<html><head><style>
      body {
        font-family: sans-serif;
        background-color: #e8f5e9;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      
      .illustration {
        width: 300px;
        display: block;
        margin: 0 auto;
        margin-bottom: 24px;
      }
      
      .content {
        text-align: center;
      }
      
      h1 {
        font-size: 36px;
        margin-bottom: 16px;
      }
      
      p {
        font-size: 18px;
        margin-bottom: 32px;
      }
      
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #4caf50;
        color: #fff;
        text-decoration: none;
        font-size: 18px;
        border-radius: 4px;
      }
      
      .button:hover {
        background-color: #43a047;
      }
      
      @media (max-width: 600px) {
        .container {
          flex-direction: column;
          align-items: center;
        }
      
        .illustration {
          width: 200px;
          margin-bottom: 16px;
        }
      }</style> </head><body><div class="container"><div class="content"><h1>Welcome to our site, ${this.registerForm.value.name}!</h1><p>Thanks for signing up. To activate your account, please click the button below:</p><a href='{{activationHtml}}' target="_blank">Activate my account: </a></div></div></body></html>`);

      const emailInfo: EmailInfo = {
        to: "karolinatrambolina@gmail.com",
        subject:"Reesen - Account activation",
        message: htmlString.replace('{{activationHtml}}', activationHtml)
      };
      this.userService.sendEmail(emailInfo)
        .subscribe(
          (info) => {this.email = info;}
        );
        this.router.navigate(['/activation'])
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
