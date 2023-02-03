import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
    id:number;
    decodedToken: {userId:number, expirationDate:Date, code:number}
    resetPasswordDTO:{newPassword:string, code:number}
    resetForm = new FormGroup(
      { 
        email: new FormControl('', [Validators.required, Validators.email]),
        passwordRepeated: new FormControl('', [Validators.required, Validators.minLength(8)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
      });

    constructor(private router: Router, 
      private userService: UserService,
       private tokenDecoder: TokenDecoderService) {}
  
    ngOnInit() {
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
      this.id = tokenInfo.id;
    }

    resetPassword() {
      if(!this.resetForm.valid) 
      {alert('Fulfill all fields acordingly');return;}

      if(this.resetForm.value.password !== this.resetForm.value.passwordRepeated) 
      {alert('Passwords must match!');return;}

      this.userService.findByEmail(this.resetForm.value.email).subscribe({
        next:(result) =>{
            if(!result.id) alert('Wrong email, try again.');
           else{
              this.resetPasswordDTO = {newPassword: this.resetForm.value.password , code: +this.resetForm.value.code}
              this.userService.resetPassword(this.resetPasswordDTO, result.id).subscribe({
                  next:(result) =>{
                      this.router.navigate(['/login']);
                  },
                  error:(error) =>{console.log(error);}
                });
           }
        },
        error:(error) =>{alert('Something went wrong');console.log(error);}
      })
     
    }
}
