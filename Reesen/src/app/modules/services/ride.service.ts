import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Report } from 'src/app/models/Report';
import { CreateRideDTO, Ride } from 'src/app/models/Ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http: HttpClient) { }


  get(rideId:number):Observable<Ride>{
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }

  getReport(role: string, typeOfReport: string, from:Date, to: Date, driverId : number = null): Observable<Report>{
    const reportDTO = {
      role:role,
      driverId:driverId,
      typeOfReport:typeOfReport,
      from:from,
      to:to
    };
    return this.http.post<Report>(environment.apiHost + 'api/ride/rides-report', reportDTO);
  }

  orderARide(ride: CreateRideDTO): Observable<Ride> {
    return this.http.post<Ride>(environment.apiHost + "api/ride/", ride);
  }

}
