import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRegistrationComponent } from './driver_registration/driver_registration.component';



@NgModule({
  declarations: [
    DriverRegistrationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ DriverRegistrationComponent]
})
export class AdminModule { }
