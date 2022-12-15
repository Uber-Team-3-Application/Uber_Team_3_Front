import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PassengerProfileComponent } from './components/passenger profile/passenger_profile.component';
import { PassengerProfileEditComponent } from './components/passenger profile edit/passenger_profile-edit.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'home', component:HomeComponent},
  {path:'passenger_profile', component:PassengerProfileComponent},
  {path:'passenger_profile-edit', component:PassengerProfileEditComponent},
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path:'**', component:HomeComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
