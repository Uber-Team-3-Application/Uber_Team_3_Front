import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kilometers-per-day',
  templateUrl: './kilometers-per-day.component.html',
  styleUrls: ['./kilometers-per-day.component.css']
})
export class KilometersPerDayComponent {
  public view: [number, number] = [700, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Day";
  public showYAxisLabel = true;
  public yAxisLabel: "Kilometers";
  public graphDataChart: any[];
  public colorScheme = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() role: string;

  constructor(){}
}
