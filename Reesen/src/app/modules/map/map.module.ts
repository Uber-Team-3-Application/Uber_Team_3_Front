import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AcceptRideComponent } from './accept-ride/accept-ride.component';


@NgModule({
  declarations: [MapComponent, AcceptRideComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    exports: [MapComponent]
})
export class MapModule { }
