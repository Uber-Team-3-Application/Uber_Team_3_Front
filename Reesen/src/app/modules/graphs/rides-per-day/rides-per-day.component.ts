import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-rides-per-day',
  templateUrl: './rides-per-day.component.html',
  styleUrls: ['./rides-per-day.component.css']
})
export class RidesPerDayComponent implements OnInit{
  public view: [number, number] = [700, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Day";
  public showYAxisLabel = true;
  public yAxisLabel: "Rides";
  public graphDataChart: any[];
  public colorScheme = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() role: string;
  report = [];
  hasLoaded: boolean = false;

  sum: number = 0;
  average: number = 0;
  
  constructor(private rideService: RideService){}

  ngOnInit(): void {
    
    this.rideService.getReport(this.role, 'RIDES_PER_DAY', this.startDate, this.endDate)
        .subscribe({

          next: (report) =>{
              console.log(report);
              this.sum = report.sum;
              this.average = Math.round((report.average + Number.EPSILON) * 100) / 100


              let keys: string [] = Object.keys(report.result);
              let values: string [] = Object.values(report.result);
              const datepipe: DatePipe = new DatePipe('en-US')
              //let formattedDate = datepipe.transform(yourDate, 'dd-MMM-YYYY HH:mm:ss')
              for(let i=0;i<keys.length;i++){
                this.report.push({
                  'rides':values[i],
                  'day':datepipe.transform(keys[i], 'dd-MM-yyyy')
                  
                });
              }
              this.hasLoaded = true;
            
          },
          error: (error) => {console.log(error);}
        })
  }


}
