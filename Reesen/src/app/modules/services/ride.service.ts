import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Report } from 'src/app/models/Report';
import { CreateRideDTO, Ride } from 'src/app/models/Ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private rideStatusChanged$ = new BehaviorSubject<boolean>(false);
  rideStatusChangedValue$ = this.rideStatusChanged$.asObservable();

  setRideStatus(test: any) {
    this.rideStatusChanged$.next(test);
  }

  constructor(private http: HttpClient) { }


  get(rideId:number):Observable<Ride>{
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }

  getPromiseRide(rideId:number):Promise<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId).toPromise();
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

  cancelRide(rideId: number, rejection:string): Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + rideId + "/cancel", {reason:rejection});
  }

  acceptRide(id:number, ride:Ride): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + id + "/accept", ride);
  }

}
