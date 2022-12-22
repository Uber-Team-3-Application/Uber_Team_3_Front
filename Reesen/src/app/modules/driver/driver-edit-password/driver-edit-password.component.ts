import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(private router: Router){

  }

  hasError:boolean = false;
  
  edit():void{
    if(this.editPasswordForm.valid){
      alert('Succesfully edited password!');
      this.router.navigate(['/driverProfile']);
    }else{
      this.hasError = true;
    }
  }
}
