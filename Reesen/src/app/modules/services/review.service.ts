import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { ReviewDTO } from 'src/app/models/Ride';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  leaveReviewForVehicle(rideId: number, rating: number, comment: string): Observable<ReviewDTO> {
    let review = {
      rating: rating,
      comment:comment

    };
    return this.http.post<ReviewDTO>(environment.apiHost + "api/review/" + rideId + '/vehicle', review);
  }

  leaveReviewForDriver(rideId: number, rating: number, comment: string): Observable<ReviewDTO> {
    let review = {
      rating: rating,
      comment:comment

    };
    return this.http.post<ReviewDTO>(environment.apiHost + "api/review/" + rideId + '/driver', review);
  }
}
