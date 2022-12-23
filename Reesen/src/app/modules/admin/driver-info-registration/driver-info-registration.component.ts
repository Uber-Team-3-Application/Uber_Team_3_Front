import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { DriverService } from 'src/app/modules/driver/services/driver.service';
import {Driver} from "../../../models/Driver";
import * as _ from 'lodash';

// vezbe 7
@Component({
  selector: 'app-driver-info-registration',
  templateUrl: './driver-info-registration.component.html',
  styleUrls: ['../driver-registration/driver-registration.component.css']
})
export class DriverInfoRegistrationComponent {

  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  createDriverForm = new FormGroup({
    firstName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(),
    passwordRepeat: new FormControl(),
    address: new FormControl()
  });


  avatarBase64: string = "";


  constructor(private driveService: DriverService) {}

  registerDriver() {
    if (this.createDriverForm.valid) {
      this.statusChanged.emit(false);
      const driver: Driver = {
        name : this.createDriverForm.value.firstName,
        surname : this.createDriverForm.value.lastName,
        profilePicture : this.avatarBase64,
        telephoneNumber : this.createDriverForm.value.phone,
        email : this.createDriverForm.value.email,
        address : this.createDriverForm.value.address,
        password : this.createDriverForm.value.password
      };
      console.log(driver);
      this.driveService.saveDriver(driver).subscribe((res: any) => {
        console.log(res);
      });
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
