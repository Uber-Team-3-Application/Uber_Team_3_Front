import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DriverService} from "../../../services/driver/driver.service";
import {Driver} from "../../../models/Driver";

@Component({
  selector: 'app-driver-info-registration',
  templateUrl: './driver-info-registration.component.html',
  styleUrls: ['../driver_registration.component.css']
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


  constructor(private driveService: DriverService) {}

  registerDriver() {
    if (this.createDriverForm.valid) {
      this.statusChanged.emit(false);
      let driver: Driver = {
        name : this.createDriverForm.value.firstName,
        surname : this.createDriverForm.value.lastName,
        profilePicture : "",
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

}
