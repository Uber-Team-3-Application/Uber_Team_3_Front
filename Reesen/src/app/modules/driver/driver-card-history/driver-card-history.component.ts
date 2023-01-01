import { Component, Input} from '@angular/core';
import {Ride} from "../../../models/Ride";
import { BarRatingModule } from "ngx-bar-rating";


@Component({
  selector: 'app-driver-card-history',
  templateUrl: './driver-card-history.component.html',
  styleUrls: ['./driver-card-history.component.css']
})


export class DriverCardHistoryComponent {

  ride : Ride;
  rating : number = 4;

  @Input() set date(value : Ride) {
    this.ride = value;
  }



}
