import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/layout/navbar/navbar.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegistrationComponent } from './modules/passenger/registration/registration.component';
import { AboutComponent } from './modules/layout/about/about.component';
import { HomeComponent } from './modules/layout/home/home.component';


import { PassengerProfileEditComponent } from './modules/passenger/passenger profile edit/passenger_profile-edit.component';
import { PassengerProfileComponent } from './modules/passenger/passenger profile/passenger_profile.component';
import {DriverRegistrationComponent} from "./modules/admin/driver_registration/driver_registration.component";
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { DriverProfileComponent } from './modules/driver/driver-profile/driver-profile.component';
import { DriverAccountComponent } from './modules/driver/driver-account/driver-account.component';
import { DriverInboxComponent } from './modules/driver/driver-inbox/driver-inbox.component';
import { DriverRideHistoryComponent } from './modules/driver/driver-ride-history/driver-ride-history.component';
import { DriverReportsComponent } from './modules/driver/driver-reports/driver-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { DriverEditBasicInfoComponent } from './modules/driver/driver-edit-basic-info/driver-edit-basic-info.component';
import { DriverEditPasswordComponent } from './modules/driver/driver-edit-password/driver-edit-password.component';
import { MapComponent } from './modules/map/map/map.component';
import { DriverEditVehicleInfoComponent } from './modules/driver/driver-edit-vehicle-info/driver-edit-vehicle-info.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    AboutComponent,
    HomeComponent,
    PassengerProfileEditComponent,
    PassengerProfileComponent,
    DriverRegistrationComponent,
    DriverProfileComponent,
    DriverAccountComponent,
    DriverInboxComponent,
    DriverRideHistoryComponent,
    DriverReportsComponent,
    DriverEditBasicInfoComponent,
    DriverEditPasswordComponent,
    MapComponent,
    DriverEditVehicleInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
