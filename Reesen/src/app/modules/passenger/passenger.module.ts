import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { PassengerProfileComponent } from './passenger-profile/passenger-profile.component';
import { PassengerProfileEditComponent } from './passenger-profile-edit/passenger-profile-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivationComponent } from './activation-wait/activation.component';
import { PassengerProfileEditPasswordComponent } from './passenger-profile-edit-password/passenger-profile-edit-password.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    PassengerProfileComponent,
    PassengerProfileEditComponent,
    ActivationComponent,
    PassengerProfileEditPasswordComponent,
    RideHistoryComponent,
    PassengerInfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    A11yModule,
    BrowserAnimationsModule
  ],
  exports: [RegistrationComponent, PassengerProfileComponent,
    PassengerProfileEditComponent, ActivationComponent, PassengerProfileEditPasswordComponent, RideHistoryComponent]
})
export class PassengerModule { }
