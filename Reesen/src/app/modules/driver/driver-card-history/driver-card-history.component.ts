import { Component, Input} from '@angular/core';
import {Ride} from "../../../models/Ride";

@Component({
  selector: 'app-driver-card-history',
  templateUrl: './driver-card-history.component.html',
  styleUrls: ['./driver-card-history.component.css']
})


export class DriverCardHistoryComponent {

  ride : Ride;
  rating  = 0;
  isFinished = true;

  @Input() set setFinished(finished : boolean) {
    this.isFinished = finished;
  }

  @Input() set date(value : Ride) {
    this.ride = value;
    let sum = 0;
    let q = 0;

    if (this.ride.reviews != undefined) {
      for (const review of this.ride.reviews) {
        sum += review.driverReview.rating;
        sum += review.vehicleReview.rating;
        q += 2;
      }
      this.rating = q == 0 ? 0 : sum / q;

    }
  }




}
