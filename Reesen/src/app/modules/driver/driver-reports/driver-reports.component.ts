import { Component } from '@angular/core';
import {TokenDecoderService} from "../../auth/token/token-decoder.service";

@Component({
  selector: 'app-driver-reports',
  templateUrl: './driver-reports.component.html',
  styleUrls: ['./driver-reports.component.css']
})
export class DriverReportsComponent {
  startDate: Date;
  endDate: Date;
  startDateSelected = false;
  endDateSelected = false;
  reportsGenerated = false;
  role = "DRIVER";
  driverId : number;
  typeRidesPerDay = "RIDES_PER_DAY";
  typeEarnedPerDay = "MONEY_EARNED_PER_DAY";
  typeKilometersPerDay = "KILOMETERS_PER_DAY";

  constructor(private tokenDecoder: TokenDecoderService) {
  }

  ngOnInit(): void {
    const decoder = this.tokenDecoder.getDecodedAccesToken();
    this.driverId = decoder.id;
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
