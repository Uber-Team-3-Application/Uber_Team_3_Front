import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review, RideReview} from "../../../models/Review";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip:'true',
  })
  constructor(private http: HttpClient) { }

  getReviewsForTheSpecificRide(rideId: number) : Observable<Review[]> {
    return this.http.get<Review[]>(environment.apiHost + "api/review/" + rideId);
  }
}
