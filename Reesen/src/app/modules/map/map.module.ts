import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AcceptRideComponent } from './accept-ride/accept-ride.component';
import { CurrentRideComponent } from './driver-current-ride/current-ride.component';
import { RateRideComponent } from './rate-ride/rate-ride.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [MapComponent, AcceptRideComponent, CurrentRideComponent, RateRideComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BarRatingModule,
    MatCardModule,
    MatSidenavModule
  ],
    exports: [MapComponent, CurrentRideComponent]
})
export class MapModule { }
