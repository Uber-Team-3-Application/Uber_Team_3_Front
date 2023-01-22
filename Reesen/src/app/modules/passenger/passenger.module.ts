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
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxPaginationModule } from 'ngx-pagination';
import { GraphsModule } from '../graphs/graphs.module';
import { LayoutModule } from '../layout/layout.module';
import { MapModule } from '../map/map.module';
import { RideCardHistoryComponent } from './ride-card-history/ride-card-history.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { OrderARideComponent } from './order-a-ride/order-a-ride.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    PassengerProfileComponent,
    PassengerProfileEditComponent,
    ActivationComponent,
    PassengerProfileEditPasswordComponent,
    RideHistoryComponent,
    RideCardHistoryComponent,
    RideDetailComponent,
    PassengerInfoComponent,
    OrderARideComponent
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
    ReactiveFormsModule,
  ],
  exports: [RegistrationComponent, PassengerProfileComponent,
    PassengerProfileEditComponent, ActivationComponent, PassengerProfileEditPasswordComponent, RideHistoryComponent, OrderARideComponent]
})
export class PassengerModule { }
