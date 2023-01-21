import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from "../../../models/Vehicle";

@Component({
  selector: 'app-driver-vehicle-registration',
  templateUrl: './driver-vehicle-registration.component.html',
  styleUrls: ['../driver-registration/driver-registration.component.css']
})
export class DriverVehicleRegistrationComponent {
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  vehicle : EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  hasError = false;

  createVehicleForm = new FormGroup({
    model: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(13)]),
    registrationNumber: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
    vehicleType: new FormControl('', [Validators.required, Validators.minLength(3)]),
    seatsNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
    babyTransport: new FormControl(false, []),
    petTransport: new FormControl(false, [])
  });

  goBack() {
    this.statusChanged.emit(true);
  }

  registerVehicle():void {

    if (this.createVehicleForm.valid) {
      this.hasError = false;
      const newVehicle: Vehicle = {

        vehicleType: this.createVehicleForm.value.vehicleType.toString().toUpperCase(),
        model: this.createVehicleForm.value.model,
        licenseNumber: this.createVehicleForm.value.registrationNumber,
        passengerSeats: parseInt(this.createVehicleForm.value.seatsNumber),
        babyTransport: this.createVehicleForm.value.babyTransport,
        petTransport: this.createVehicleForm.value.petTransport
      }
      this.vehicle.emit(newVehicle);
    }else{
      this.hasError = true;
    }
  }
}
