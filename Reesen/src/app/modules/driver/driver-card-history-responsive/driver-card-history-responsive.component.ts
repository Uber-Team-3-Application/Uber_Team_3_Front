import {Component, Input} from '@angular/core';
import {Ride} from "../../../models/Ride";

@Component({
  selector: 'app-driver-card-history-responsive',
  templateUrl: './driver-card-history-responsive.component.html',
  styleUrls: ['./driver-card-history-responsive.component.css']
})
export class DriverCardHistoryResponsiveComponent {
  ride : Ride;
  rating : number = 1;

  @Input() set date(value : Ride) {
    this.ride = value;
    let sum = 0;
    let q = 1;

    if (this.ride.reviews != undefined) {
      for (let review of this.ride.reviews) {
        sum += review.driverReview.rating;
        sum += review.vehicleReview.rating;
        q += 2;
      }
      this.rating = sum / q;
    }
  }
}
