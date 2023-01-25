import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AcceptRideComponent } from './accept-ride/accept-ride.component';
import { CurrentRideComponent } from './driver-current-ride/current-ride.component';


@NgModule({
  declarations: [MapComponent, AcceptRideComponent, CurrentRideComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    exports: [MapComponent, CurrentRideComponent]
})
export class MapModule { }
