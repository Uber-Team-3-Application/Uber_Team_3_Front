import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRegistrationComponent } from './driver-registration/driver-registration.component';
import { DriverInfoRegistrationComponent } from './driver-info-registration/driver-info-registration.component';
import { DriverVehicleRegistrationComponent } from './driver-vehicle-registration/driver-vehicle-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersInfoComponent } from './users-info/users-info.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
@NgModule({
  declarations: [
    DriverRegistrationComponent,
    DriverInfoRegistrationComponent,
    DriverVehicleRegistrationComponent,
    UsersInfoComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  exports: [ DriverRegistrationComponent, UsersInfoComponent]
})
export class AdminModule { }
