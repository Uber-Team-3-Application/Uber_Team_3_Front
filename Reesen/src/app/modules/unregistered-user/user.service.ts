import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { RideInfo, RideInfoBody } from 'src/app/models/Ride';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getRideAssumption(rideInfoBody: RideInfoBody):Observable<RideInfo>{
    return this.http.post<RideInfo>(environment.apiHost + "api/unregisteredUser/", rideInfoBody);

  }

}
