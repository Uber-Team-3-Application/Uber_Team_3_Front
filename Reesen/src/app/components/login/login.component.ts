import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
    loginForm = new FormGroup(
      { 
        email: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      }
    );
    hasError:boolean = false;

    constructor(){}

    login(){
      if(!this.loginForm.valid) {this.hasError = true; return;}
      else this.hasError = false;

      const loginInfo = {
        email: this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      
    }
}