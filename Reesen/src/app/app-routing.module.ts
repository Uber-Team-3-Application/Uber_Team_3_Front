import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverEditBasicInfoComponent } from './modules/driver/driver-edit-basic-info/driver-edit-basic-info.component';
import { DriverEditPasswordComponent } from './modules/driver/driver-edit-password/driver-edit-password.component';
import { DriverProfileComponent } from './modules/driver/driver-profile/driver-profile.component';
import { HomeComponent } from './modules/layout/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { PassengerProfileComponent } from './modules/passenger/passenger profile/passenger_profile.component';
import { PassengerProfileEditComponent } from './modules/passenger/passenger profile edit/passenger_profile-edit.component';

import { RegistrationComponent } from './modules/passenger/registration/registration.component';
import {DriverRegistrationComponent} from "./modules/admin/driver_registration/driver_registration.component";
import { DriverEditVehicleInfoComponent } from './modules/driver/driver-edit-vehicle-info/driver-edit-vehicle-info.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'home', component:HomeComponent},
  {path:'passenger_profile', component:PassengerProfileComponent},
  {path:'passenger_profile-edit', component:PassengerProfileEditComponent},
  {path:'driverProfile', component:DriverProfileComponent, children: [
    {path:'account', redirectTo: '', pathMatch:'full', component:DriverProfileComponent},
    {path:'rideHistory', component:DriverProfileComponent},
    {path:'reports', component:DriverProfileComponent},
  ]},
  {path:'driverEdit', component:DriverEditBasicInfoComponent},
  {path:'driverEditVehicle', component:DriverEditVehicleInfoComponent},
  {path: 'driverEditPassword', component:DriverEditPasswordComponent},
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path: 'registerDriver', component:DriverRegistrationComponent},
  {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
