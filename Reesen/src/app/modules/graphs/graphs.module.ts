import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RidesPerDayComponent } from './rides-per-day/rides-per-day.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    RidesPerDayComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  exports:[RidesPerDayComponent]
})
export class GraphsModule { }
