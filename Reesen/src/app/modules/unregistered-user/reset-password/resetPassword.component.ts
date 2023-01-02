import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit{
    token: string;
    decodedToken: {userId:number, expirationDate:Date, code:number}
    resetPasswordDTO:{password:string, code:number}
    resetForm = new FormGroup(
      { 
        passwordRepeated: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      })
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}
  
    ngOnInit() {
      this.token = this.route.snapshot.queryParams['token'];
      this.decodedToken = jwt_decode(this.token);
    }
    resetPassword() {
      this.resetPasswordDTO = {password: this.resetForm.get('password').value , code:this.decodedToken.code}
      this.userService.resetPassword(this.resetPasswordDTO,this.decodedToken.userId);
      this.router.navigate(['/login'])
    }
}
