import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Vehicle} from "../../../models/Vehicle";

@Component({
  selector: 'app-driver-vehicle-registration',
  templateUrl: './driver-vehicle-registration.component.html',
  styleUrls: ['../driver-registration/driver-registration.component.css']
})
export class DriverVehicleRegistrationComponent {
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  vehicle : EventEmitter<Vehicle> = new EventEmitter<Vehicle>();


  createVehicleForm = new FormGroup({
    model: new FormControl(),
    registrationNumber: new FormControl(),
    vehicleType : new FormControl(),
    seatsNumber : new FormControl(),
    petTransport : new FormControl(false),
    flexCheckDefault : new FormControl(false),
  });

  goBack() {
    this.statusChanged.emit(true);
  }

  registerVehicle():void {

    if (this.createVehicleForm.valid) {
      const newVehicle: Vehicle = {

        vehicleType: this.createVehicleForm.value.vehicleType.toString().toUpperCase(),
        model: this.createVehicleForm.value.model,
        licenseNumber: this.createVehicleForm.value.registrationNumber,
        passengerSeats: parseInt(this.createVehicleForm.value.seatsNumber),
        babyTransport: this.createVehicleForm.value.flexCheckDefault,
        petTransport: this.createVehicleForm.value.petTransport
      }
      this.vehicle.emit(newVehicle);
    }
  }
}
