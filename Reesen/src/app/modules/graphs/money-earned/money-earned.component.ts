import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-money-earned',
  templateUrl: './money-earned.component.html',
  styleUrls: ['./money-earned.component.css']
})
export class MoneyEarnedComponent {
  public view: [number, number] = [700, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Day";
  public showYAxisLabel = true;
  public yAxisLabel: "Earned";
  public graphDataChart: any[];
  public colorScheme = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() role: string;

  constructor(){}
}
