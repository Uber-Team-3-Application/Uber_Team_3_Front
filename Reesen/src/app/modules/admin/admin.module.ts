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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphsModule } from '../graphs/graphs.module';
import { PanicNotificationComponent } from './panic-notification/panic-notification.component';
import { PanicPageAdminComponent } from './panic-page-admin/panic-page-admin.component';
import { PanicPressedComponent } from './panic-pressed/panic-pressed.component';
import { MapModule } from '../map/map.module';

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
    ReportsComponent,
    PanicNotificationComponent,
    PanicPageAdminComponent,
    PanicPressedComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    GraphsModule,
    NgxChartsModule,
    MapModule
  ],
  exports: [ DriverRegistrationComponent, UsersInfoComponent, ReportsComponent, PanicPageAdminComponent, PanicPressedComponent]
})
export class AdminModule { }
