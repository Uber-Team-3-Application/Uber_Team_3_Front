import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'home', component:HomeComponent},
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path:'**', component:HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
