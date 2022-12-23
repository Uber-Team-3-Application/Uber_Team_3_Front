import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRegistrationComponent } from './driver-registration/driver-registration.component';
import { DriverInfoRegistrationComponent } from './driver-info-registration/driver-info-registration.component';
import { DriverVehicleRegistrationComponent } from './driver-vehicle-registration/driver-vehicle-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
