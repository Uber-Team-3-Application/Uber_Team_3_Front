import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
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

    constructor(private router:Router, private authenticationService: AuthenticationService){}

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
          localStorage.setItem('refreshToken', JSON.stringify(result["refrshToken"]));
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
}