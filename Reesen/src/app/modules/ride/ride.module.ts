import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRideComponent } from './driver-current-ride/current-ride.component';
import { MapModule } from '../map/map.module';
import { DriverModule } from '../driver/driver.module';



@NgModule({
  declarations: [CurrentRideComponent],
  imports: [
    CommonModule,
    MapModule,
    DriverModule
  ],
  exports:[CurrentRideComponent]
})
export class RideModule { }
