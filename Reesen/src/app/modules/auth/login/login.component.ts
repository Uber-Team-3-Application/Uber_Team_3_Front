import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailInfo } from 'src/app/models/Email';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { UserService } from '../../unregistered-user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
    loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.minLength(4), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );
    hasError = false;
    email: EmailInfo;
    resetCode : string;

    constructor(private router:Router,
      private authenticationService: AuthenticationService,
      private userService: UserService){}

    login(){
      if(!this.loginForm.valid) {this.hasError = true; return;}
      else this.hasError = false;

      const loginInfo = {
        email: this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this.authenticationService.login(loginInfo).subscribe({

        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result["token"]));
          localStorage.setItem('refreshToken', JSON.stringify(result["refreshToken"]));
          this.authenticationService.setUser();
          this.router.navigate(['/']);

        },
        error : (error) =>{
          if(error instanceof HttpErrorResponse){
            this.hasError = true;
          }
        }

      });

    }

    sendEmailReset(){
      alert("Mail sent!");
      this.userService.findByEmail(this.loginForm.value.email).subscribe((user) => {
       this.userService.resetPasswordLink(user.id).subscribe((code:string) => {
        this.resetCode = code;
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
            <h1 class="text-center lbl">Reset your password</h1>
            <p class="line center"></p><br>
            <p class="text-center lbl2">This is a code for reset your password!</p>
            <p class="text-center lbl2">${this.resetCode}</p>
            <br><br><br>
            <p class="text-center lbl">This email was sent to you by Reesen Inc. You are receiving this email because you registred on our website. If this wasn't you, please ignore this mail.</p>
      </div>
      </html>`;
        const emailInfo: EmailInfo = {
          to: this.loginForm.value.email,
          subject:"Reesen - Password Reset",
          message: htmlString
        };
        this.userService.sendEmail(emailInfo)
          .subscribe(
            (info) => {this.email = info;}
          );
       });
      });
      this.router.navigate(['/resetPassword'])
    }

}
