import { Component, Input} from '@angular/core';
import {Ride} from "../../../models/Ride";

@Component({
  selector: 'app-ride-card-history',
  templateUrl: './ride-card-history.component.html',
  styleUrls: ['./ride-card-history.component.css']
})


export class RideCardHistoryComponent {

  ride : Ride;
  rating : number = 1;
  isFinished: boolean = true;

  @Input() set setFinished(finished : boolean) {
    this.isFinished = finished;
  }

  @Input() set date(value : Ride) {
    this.ride = value;
    let sum = 0;
    let q = 0;

    if (this.ride.reviews != undefined) {
      for (let review of this.ride.reviews) {
        sum += review.driverReview.rating;
        sum += review.vehicleReview.rating;
        q += 2;
      }
      if (q == 0) this.rating = 0;
      this.rating = q == 0 ? 1 : sum / q;

    }
  }



}
