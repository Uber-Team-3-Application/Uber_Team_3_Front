import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Driver} from "../../../models/Driver";

@Component({
  selector: 'app-driver-info-registration',
  templateUrl: './driver-info-registration.component.html',
  styleUrls: ['../driver-registration/driver-registration.component.css']
})
export class DriverInfoRegistrationComponent {

  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  driver : EventEmitter<Driver> = new EventEmitter<Driver>();
  hasError = false;
  createDriverForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.email, Validators.minLength(8), Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)])
  });


  avatarBase64 = "";


  registerDriver() {
    if (this.createDriverForm.valid && this.createDriverForm.value.password && this.createDriverForm.value.passwordRepeat) {
      this.hasError = false;
      this.statusChanged.emit(false);
      const new_driver: Driver = {
        name : this.createDriverForm.value.firstName,
        surname : this.createDriverForm.value.lastName,
        profilePicture : this.avatarBase64,
        telephoneNumber : this.createDriverForm.value.phone,
        email : this.createDriverForm.value.email,
        address : this.createDriverForm.value.address,
        password : this.createDriverForm.value.password
      };
      this.driver.emit(new_driver);
    }else{
      this.hasError = true;
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
