import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenDecoderService } from '../../auth/token/token-decoder.service';
import { UserService } from '../../unregistered-user/user.service';

@Component({
  selector: 'app-passenger-profile-edit-password',
  templateUrl: './passenger-profile-edit-password.component.html',
  styleUrls: ['./passenger-profile-edit-password.component.css']
})
export class PassengerProfileEditPasswordComponent {

  editPasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    repeatNewPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  hasError = false;

  constructor(private router: Router,
              private userService: UserService,
              private tokenDecoder: TokenDecoderService){

  }

  
  edit():void{
    if(this.editPasswordForm.valid){
      if(this.editPasswordForm.value.newPassword !== this.editPasswordForm.value.repeatNewPassword){
        alert("Passwords dont match!");
        return;
      }
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
      this.userService.updatePassword(tokenInfo.id, this.editPasswordForm.value.newPassword, this.editPasswordForm.value.oldPassword)
                        .subscribe();
      alert('Succesfully edited password!');
      this.router.navigate(['/passenger_profile']);
    }else{
      this.hasError = true;
    }
  }
}
