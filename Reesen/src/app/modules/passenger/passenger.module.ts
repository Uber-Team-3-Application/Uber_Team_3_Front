import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { PassengerProfileComponent } from './passenger-profile/passenger-profile.component';
import { PassengerProfileEditComponent } from './passenger-profile-edit/passenger-profile-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivationComponent } from './activation-wait/activation.component';
import { PassengerProfileEditPasswordComponent } from './passenger-profile-edit-password/passenger-profile-edit-password.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationBuilder } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxPaginationModule } from 'ngx-pagination';
import { GraphsModule } from '../graphs/graphs.module';
import { LayoutModule } from '../layout/layout.module';
import { MapModule } from '../map/map.module';
import { RideCardHistoryComponent } from './ride-card-history/ride-card-history.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    PassengerProfileComponent,
    PassengerProfileEditComponent,
    ActivationComponent,
    PassengerProfileEditPasswordComponent,
    RideHistoryComponent,
    RideCardHistoryComponent,
    RideDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSidenavModule,
    LayoutModule,
    NgxPaginationModule,
    MapModule,
    GraphsModule,
    FormsModule,
  ],
  exports: [RegistrationComponent, PassengerProfileComponent, 
    PassengerProfileEditComponent, ActivationComponent, PassengerProfileEditPasswordComponent, RideHistoryComponent]
})
export class PassengerModule { }
