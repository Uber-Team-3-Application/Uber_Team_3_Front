import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-rides-per-day',
  templateUrl: './rides-per-day.component.html',
  styleUrls: ['./rides-per-day.component.css'],
})
export class RidesPerDayComponent implements OnInit{
  public view: [number, number] = [700, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public graphDataChart: any[];
  public colorScheme = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() role: string;
  @Input() typeOfReport: string;
  reportData = new Array();
  hasLoaded: boolean = false;

  sum: number = 0;
  average: number = 0;
  
  constructor(private rideService: RideService){}

  ngOnInit(): void {
    
    this.hasLoaded = false;
    this.rideService.getReport(this.role, this.typeOfReport, this.startDate, this.endDate)
        .subscribe({

          next: (report) =>{
              console.log(report);
              this.sum = report.sum;
              this.average = Math.round((report.average + Number.EPSILON) * 100) / 100


              let keys: string [] = Object.keys(report.result);
              let values: string [] = Object.values(report.result);
              const datepipe: DatePipe = new DatePipe('en-US');
              let valuesNum= new Array();
              for(let j = 0;j<values.length;j++){
                valuesNum.push(+values[j]);
              }
              for(let i=0;i<keys.length;i++){
                this.reportData.push({
                  value:valuesNum[i],
                  name:datepipe.transform(keys[i], 'dd-MM-yyyy')
                  
                });
              }
              this.hasLoaded = true;
              console.log(this.reportData);
            
          },
          error: (error) => {console.log(error);}
        })
  }


}