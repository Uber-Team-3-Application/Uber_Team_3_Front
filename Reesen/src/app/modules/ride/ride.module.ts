import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRideComponent } from './driver-current-ride/current-ride.component';



@NgModule({
  declarations: [CurrentRideComponent],
  imports: [
    CommonModule
  ],
  exports:[CurrentRideComponent]
})
export class RideModule { }
