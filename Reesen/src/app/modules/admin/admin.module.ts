import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRegistrationComponent } from './driver_registration/driver_registration.component';
import { DriverInfoRegistrationComponent } from './driver-info-registration/driver-info-registration.component';
import { DriverVehicleRegistrationComponent } from './driver-vehicle-registration/driver-vehicle-registration.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DriverRegistrationComponent,
    DriverInfoRegistrationComponent,
    DriverVehicleRegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ DriverRegistrationComponent]
})
export class AdminModule { }
