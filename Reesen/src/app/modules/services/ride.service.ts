import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Ride } from 'src/app/models/Ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http: HttpClient) { }


  get(rideId:number):Observable<Ride>{
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }

}
