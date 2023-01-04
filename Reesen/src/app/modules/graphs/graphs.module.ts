import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RidesPerDayComponent } from './rides-per-day/rides-per-day.component';
import { KilometersPerDayComponent } from './kilometers-per-day/kilometers-per-day.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MoneyEarnedComponent } from './money-earned/money-earned.component';
import { MoneySpentComponent } from './money-spent/money-spent.component';



@NgModule({
  declarations: [
    RidesPerDayComponent,
    KilometersPerDayComponent,
    MoneyEarnedComponent,
    MoneySpentComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
  ],
  exports:[RidesPerDayComponent, KilometersPerDayComponent, MoneyEarnedComponent, MoneySpentComponent]
})
export class GraphsModule { }
