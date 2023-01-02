import {Component, OnDestroy, ViewChild} from '@angular/core';
import {DriverService} from "../services/driver.service";
import {Ride, RidePaginated} from "../../../models/Ride";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-driver-ride-history',
  templateUrl: './driver-ride-history.component.html',
  styleUrls: ['./driver-ride-history.component.css']
})
export class DriverRideHistoryComponent implements OnDestroy{

  constructor(private driverService : DriverService, private tokenDecoder: TokenDecoderService,
              public taskService : TaskService) {

  }
  showSideBar = false;
  driversRides : RidePaginated;
  smartTable : TableRideContent[] = new Array<TableRideContent>;


  ngOnInit() : void {
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    this.driverService.getRidesOfSpecificDriver(tokenInfo.id).subscribe(
      (res : RidePaginated) => {this.driversRides = res;
        this.generateSmartTable()})

  }

  changeState(event : boolean) {
    this.showSideBar = event;
  }

  setSortedSmartTable(event : string) {
    this.taskService.deleteArray()
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    this.driverService.getRidesOfSpecificDriver(tokenInfo.id, event).subscribe(
      (res : RidePaginated) => {
        this.driversRides = res;
        this.showSideBar = false;
        this.generateSmartTable()
      })

  }


  generateSmartTable() {

    for (let i = 0; i < this.driversRides.results.length; i += 2) {
      this.taskService.fillTable({
        column1 : this.driversRides.results[i],
        column2 : this.driversRides.results[i+1],
      });
    }
  }

  ngOnDestroy() {
    this.taskService.deleteArray()
  }

}

export interface TableRideContent {
  column1 : Ride,
  column2 : Ride
}
