import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';


import { PassengerProfileEditComponent } from './components/passenger profile edit/passenger_profile-edit.component';
import { PassengerProfileComponent } from './components/passenger profile/passenger_profile.component';
import {DriverRegistrationComponent} from "./components/driver_registration/driver_registration.component";
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { DriverAccountComponent } from './components/driver-account/driver-account.component';
import { DriverInboxComponent } from './components/driver-inbox/driver-inbox.component';
import { DriverRideHistoryComponent } from './components/driver-ride-history/driver-ride-history.component';
import { DriverReportsComponent } from './components/driver-reports/driver-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { DriverEditBasicInfoComponent } from './components/driver-edit-basic-info/driver-edit-basic-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditVehicleInfoComponent } from './components/edit-vehicle-info/edit-vehicle-info.component';
import { DriverEditPasswordComponent } from './components/driver-edit-password/driver-edit-password.component';

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
    ChangePasswordComponent,
    EditVehicleInfoComponent,
    DriverEditPasswordComponent,
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
