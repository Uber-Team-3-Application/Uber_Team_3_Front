import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-driver-vehicle-registration',
  templateUrl: './driver-vehicle-registration.component.html',
  styleUrls: ['../driver_registration.component.css']
})
export class DriverVehicleRegistrationComponent {
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  createVehicleForm = new FormGroup({
    model: new FormControl(),
    registrationNumber: new FormControl(),

  });

  goBack() {
    this.statusChanged.emit(true);
  }

  registerVehicle() {

  }
}
