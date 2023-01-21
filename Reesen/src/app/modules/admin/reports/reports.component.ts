import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { DriverService } from '../../driver/services/driver.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  startDate: Date;
  endDate: Date;
  startDateSelected = false;
  endDateSelected = false;
  reportsGenerated = false;
  drivers: Driver[];
  role = "ADMIN";
  hasLoaded = false;
  typeRidesPerDay = "RIDES_PER_DAY";
  typeEarnedPerDay = "MONEY_EARNED_PER_DAY";
  typeKilometersPerDay = "KILOMETERS_PER_DAY";
  selectedUser = "All";
  driverId = 0;

  constructor(private driverService:DriverService){}
  
  ngOnInit(): void {
    this.startDate = new Date();
    this.endDate = new Date();
    this.driverService.getAll()
        .subscribe(
          {
            next:(result) =>{this.drivers = result.results;this.hasLoaded = true;},
            error:(error) =>{console.log(error);}
          }
        )

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
    if(this.selectedUser.toLocaleLowerCase() != "all"){
      this.role = "DRIVER";
      this.driverId = +this.selectedUser.split(" ")[0];
    }else{
      this.role = "ADMIN";
      this.driverId = null;
    }
    this.reportsGenerated = true;
  }

  resetData(): void{
    this.startDate = null;
    this.endDate = null;
    this.reportsGenerated = false;
  }
}
