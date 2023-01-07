import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  startDate: Date;
  endDate: Date;
  startDateSelected: boolean = false;
  endDateSelected: boolean = false;
  reportsGenerated: boolean = false;
  role: string = "ADMIN";
  typeRidesPerDay: string = "RIDES_PER_DAY";
  typeEarnedPerDay: string = "MONEY_EARNED_PER_DAY";
  typeKilometersPerDay: string = "KILOMETERS_PER_DAY";
  constructor(){}
  
  ngOnInit(): void {
    this.startDate = new Date();
    this.endDate = new Date();

  

  }
  setSelectedStartDate(): void{
    this.startDateSelected = true;
  }
  setSelectedEndDate(): void{
    this.endDateSelected = true;
  }

  areDatesValid(): boolean{
    if(!this.startDateSelected || !this.endDateSelected) return false;
    if(this.startDate > this.endDate) return false;

    return true;
  }

  generateReports(): void{
    if(!this.areDatesValid()){
      alert("Please select valid dates!");
      return;
    }
    this.reportsGenerated = true;
  }

  resetData(): void{
    this.startDate = null;
    this.endDate = null;
    this.reportsGenerated = false;
  }
}
