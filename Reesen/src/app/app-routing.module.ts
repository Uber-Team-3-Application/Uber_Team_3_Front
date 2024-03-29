import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverEditBasicInfoComponent } from './modules/driver/driver-edit-basic-info/driver-edit-basic-info.component';
import { DriverEditPasswordComponent } from './modules/driver/driver-edit-password/driver-edit-password.component';
import { DriverProfileComponent } from './modules/driver/driver-profile/driver-profile.component';
import { HomeComponent } from './modules/layout/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { PassengerProfileComponent } from './modules/passenger/passenger-profile/passenger-profile.component';
import { PassengerProfileEditComponent } from './modules/passenger/passenger-profile-edit/passenger-profile-edit.component';
import { RegistrationComponent } from './modules/passenger/registration/registration.component';
import {DriverRegistrationComponent} from "./modules/admin/driver-registration/driver-registration.component";
import { DriverEditVehicleInfoComponent } from './modules/driver/driver-edit-vehicle-info/driver-edit-vehicle-info.component';
import { ActivationpageComponent } from './modules/passenger/activation-page/activationpage.component';
import { ActivationComponent } from './modules/passenger/activation-wait/activation.component';
import { LoginGuard } from './modules/auth/guard/login.guard';
import { UsersInfoComponent } from './modules/admin/users-info/users-info.component';
import { UserDetailsComponent } from './modules/admin/user-details/user-details.component';
import { EditUserProfileComponent } from './modules/admin/edit-user-profile/edit-user-profile.component';
import { EditDriverVehicleComponent } from './modules/admin/edit-driver-vehicle/edit-driver-vehicle.component';
import { EditRequestsComponent } from './modules/admin/edit-requests/edit-requests.component';
import { PassengerProfileEditPasswordComponent } from './modules/passenger/passenger-profile-edit-password/passenger-profile-edit-password.component';
import {DriverRideHistoryComponent} from "./modules/driver/driver-ride-history/driver-ride-history.component";
import { ResetPasswordComponent } from './modules/unregistered-user/reset-password/reset-password.component';
import { UserRideHistoryComponent } from './modules/admin/user-ride-history/user-ride-history.component';
import { UserRideInfoComponent } from './modules/admin/user-ride-info/user-ride-info.component';
import { ReportsComponent } from './modules/admin/reports/reports.component';
import { RideHistoryComponent } from './modules/passenger/ride-history/ride-history.component';
import { RideDetailComponent } from './modules/passenger/ride-detail/ride-detail.component';
import {DriversRideComponent} from "./modules/driver/drivers-ride/drivers-ride.component";
import {PassengerInfoComponent} from "./modules/passenger/passenger-info/passenger-info.component";
import {DriverReportsComponent} from "./modules/driver/driver-reports/driver-reports.component";
import { PanicPageAdminComponent } from './modules/admin/panic-page-admin/panic-page-admin.component';
import {DocumentsComponent} from "./modules/driver/documents/documents.component";
import {CurrentRideComponent} from "./modules/map/driver-current-ride/current-ride.component";
import { PanicPressedComponent } from './modules/admin/panic-pressed/panic-pressed.component';
import { PassengersRideComponent } from './modules/passenger/pasnegers-ride/passengers-ride.component';
import { PassengerReportsComponent } from './modules/passenger/passenger-reports/passenger-reports.component';
import { RateRideComponent } from './modules/map/rate-ride/rate-ride.component';
import { PassengersInfoComponent } from './modules/passenger/passengers-info/passenger-info.component';


const routes: Routes = [
  {path:'login', component:LoginComponent,
  canActivate: [LoginGuard],
  loadChildren: () =>
    import('../app/modules/auth/auth.module').then((m) => m.AuthModule),},
  {path:'register', component:RegistrationComponent},
  {path:'resetPassword', component:ResetPasswordComponent},
  {path:'activationPage', component:ActivationpageComponent},
  {path:'activation', component:ActivationComponent},
  {path:'home', component:HomeComponent},
  {path: 'home/:rideId', component:HomeComponent},
  {path: 'current_ride/:rideId/:rideRole', component: CurrentRideComponent},
  {path:'passenger_profile', component:PassengerProfileComponent},
  {path:'passenger_profile-edit', component:PassengerProfileEditComponent},
  {path:'passenger_ride-history', component:RideHistoryComponent},
  {path:'passenger_ride-detail/:rideId', component:RideDetailComponent},
  {path:'driverProfile', component:DriverProfileComponent, children: [
    {path:'account', redirectTo: '', pathMatch:'full', component:DriverProfileComponent},
      {path: 'documents', component:DocumentsComponent},
    {path:'rideHistory', component:DriverRideHistoryComponent},
    {path:'reports', component:DriverProfileComponent},
  ]},
  {path:'ride-rating/:rideId', component:RateRideComponent},
  {path:'panic-notification', component:PanicPressedComponent},
  {path: 'passengerInfo/:id/:rideId', component: PassengerInfoComponent},
  {path: 'passengersInfo/:id/:rideId', component: PassengersInfoComponent},
  {path: 'driverRideHistory', component:DriverRideHistoryComponent},
  { path: 'driversRide/:rideId', component: DriversRideComponent },
  {path: 'rideHistory', component: RideHistoryComponent},
  { path: 'passengersRide/:rideId', component: PassengersRideComponent },
  {path:'driverEdit', component:DriverEditBasicInfoComponent},
  {path:'driverEditVehicle', component:DriverEditVehicleInfoComponent},
  {path: 'driverEditPassword', component:DriverEditPasswordComponent},
  {path: 'passenger_profile-edit-password', component: PassengerProfileEditPasswordComponent},
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path: 'registerDriver', component:DriverRegistrationComponent},
  {path: 'admin-reports', component:ReportsComponent},
  {path: 'driver-reports', component:DriverReportsComponent},
  {path: 'passenger-reports', component: PassengerReportsComponent},
  {path: 'users', component: UsersInfoComponent},
  {path: 'panic', component: PanicPageAdminComponent},
  {path: 'users/:id/:role', component: UserDetailsComponent},
  {path: 'users/:id/:role/edit', component: EditUserProfileComponent},
  {path: 'users/:id/:role/edit-vehicle', component: EditDriverVehicleComponent},
  {path: 'users/edit-requests', component: EditRequestsComponent},
  {path: 'users/:id/:role/ride-history', component: UserRideHistoryComponent},
  {path: 'users/:id/:role/ride-history/:rideId', component: UserRideInfoComponent},
  {path:'**', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
