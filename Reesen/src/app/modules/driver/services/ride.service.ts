import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ride} from "../../../models/Ride";
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip:'true',
  })
  constructor(private http: HttpClient) { }

  getRideById(rideId : number) : Observable<Ride> {
    return this.http.get<Ride>(environment.apiHost + "api/ride/" + rideId);
  }
}
