import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverEditBasicInfoComponent } from './components/driver-edit-basic-info/driver-edit-basic-info.component';
import { DriverEditPasswordComponent } from './components/driver-edit-password/driver-edit-password.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PassengerProfileComponent } from './components/passenger profile/passenger_profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {DriverRegistrationComponent} from "./components/driver_registration/driver_registration.component";

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'home', component:HomeComponent},
  {path:'passenger_profile', component:PassengerProfileComponent},
  {path:'driverProfile', component:DriverProfileComponent, children: [
    {path:'account', redirectTo: '', pathMatch:'full', component:DriverProfileComponent},
    {path:'rideHistory', component:DriverProfileComponent},
    {path:'reports', component:DriverProfileComponent},
  ]},
  {path:'driverEdit', component:DriverEditBasicInfoComponent},
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
