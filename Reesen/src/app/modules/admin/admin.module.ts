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
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { EditDriverVehicleComponent } from './edit-driver-vehicle/edit-driver-vehicle.component';
import { EditRequestsComponent } from './edit-requests/edit-requests.component';
import { UserRideHistoryComponent } from './user-ride-history/user-ride-history.component';
import { UserRideInfoComponent } from './user-ride-info/user-ride-info.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    DriverRegistrationComponent,
    DriverInfoRegistrationComponent,
    DriverVehicleRegistrationComponent,
    UsersInfoComponent,
    UserDetailsComponent,
    EditUserProfileComponent,
    EditDriverVehicleComponent,
    EditRequestsComponent,
    UserRideHistoryComponent,
    UserRideInfoComponent,
    ReportsComponent
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
