import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import { Driver } from 'src/app/models/Driver';
import { UserService } from '../../unregistered-user/user.service';

@Component({
  selector: 'app-driver-edit-password',
  templateUrl: './driver-edit-password.component.html',
  styleUrls: ['./driver-edit-password.component.css']
})
export class DriverEditPasswordComponent{

  editPasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    repeatNewPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private router: Router,
              private userService: UserService,
              private tokenDecoder: TokenDecoderService){

  }

  hasError:boolean = false;
  
  edit():void{
    if(this.editPasswordForm.valid){
      if(this.editPasswordForm.value.newPassword !== this.editPasswordForm.value.repeatNewPassword){
        alert("Passwords dont match!");
        return;
      }
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
      this.userService.updatePassword(tokenInfo.id, this.editPasswordForm.value.newPassword, this.editPasswordForm.value.oldPassword)
                        .subscribe();
      //alert('Succesfully edited password!');
      //this.router.navigate(['/driverProfile']);
    }else{
      this.hasError = true;
    }
  }
}
