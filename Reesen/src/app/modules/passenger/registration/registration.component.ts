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
      const htmlString = `<html><head><style>
    
    .btn{
        color:white;
        margin-top: 7px;
        width: 32%;
        margin-left: 34%;
        background-color:#48786d; 
        padding:6px;
        border-radius: 8px;
        border: 1px transparent;
        font-weight: 500;
        font-size: 16px;
        text-transform: uppercase;
        box-shadow: 2px 2px 5px rgb(91, 91, 91);
        margin-bottom: 10px;
    }

    .container{
      box-shadow: 3px 5px 15px rgb(129, 129, 129);
      border-radius: 15px;
      padding: 11px;
      width: 40%;
      margin-left:30%;
      margin-top: 10px;
    }

    .center{
      width: 50%; /* Define the width of the element */
      margin: auto; 
    }
    
    .lbl{
        text-align: center;
        color:#48786d;
    }

    .lbl2{
      text-align: center;
      color:#48786d;
      font-size: 14px;
      font-weight: 300;
  }
    .line{
      border-bottom: 7px solid #48786d;
      position: relative;
      top:12px;
      width: 40%;
  }
    </style>
    </head>
    <img src="https://www.pngall.com/wp-content/uploads/2/Envelope-PNG-Free-Download.png" style="width:20%;margin-left: 40%;;">
    <div class="container">
            <h1 class="text-center lbl">Verify your email</h1>
            <p class="line center"></p><br>
            <p class="text-center lbl2">${this.registerForm.value.name}, Thanks for signing up for the Reesen app. Please click Confirm button for account activation to start ordering rides!</p>
            <a href='{{activationHtml}}' target="_blank" ><button class="btn">confirm email</button></a>
            <br><br><br>
            <p class="text-center lbl">This email was sent to you by Reesen Inc. You are receiving this email because you registred on our website. If this wasn't you, please ignore this mail.</p>
      </div>
      </html>`;

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
