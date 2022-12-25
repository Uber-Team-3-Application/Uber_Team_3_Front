import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { PassengerProfileComponent } from './passenger-profile/passenger-profile.component';
import { PassengerProfileEditComponent } from './passenger-profile-edit/passenger-profile-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivationComponent } from './activation-wait/activation.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    PassengerProfileComponent,
    PassengerProfileEditComponent,
    ActivationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [RegistrationComponent, PassengerProfileComponent, PassengerProfileEditComponent, ActivationComponent]
})
export class PassengerModule { }
