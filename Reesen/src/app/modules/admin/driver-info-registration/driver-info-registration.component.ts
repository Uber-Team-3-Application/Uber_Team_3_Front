import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Driver} from "../../../models/Driver";

@Component({
  selector: 'app-driver-info-registration',
  templateUrl: './driver-info-registration.component.html',
  styleUrls: ['../driver-registration/driver-registration.component.css']
})
export class DriverInfoRegistrationComponent {

  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  driver : EventEmitter<Driver> = new EventEmitter<Driver>();

  createDriverForm = new FormGroup({
    firstName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    passwordRepeat: new FormControl(),
    address: new FormControl()
  });


  avatarBase64 = "";


  registerDriver() {
    // if (this.createDriverForm.valid) {
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
