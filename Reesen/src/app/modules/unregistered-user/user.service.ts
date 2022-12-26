import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { RideInfo, RideInfoBody } from 'src/app/models/Ride';
import { PageUsers } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getRideAssumption(rideInfoBody: RideInfoBody):Observable<RideInfo>{
    return this.http.post<RideInfo>(environment.apiHost + "api/unregisteredUser/", rideInfoBody);

  }
  getUsers(page: number, size:number): Observable<PageUsers>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<PageUsers>(environment.apiHost + "api/user", {
      params:params
    });
  }
  getUsersByRole(page:number, size:number, role: string): Observable<PageUsers>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    if(role === "DRIVER")
      return this.http.get<PageUsers>(environment.apiHost + "api/driver", {
        params:params
      });
    else
    return this.http.get<PageUsers>(environment.apiHost + "api/passenger", {
      params:params
    });
  }

  getTotalNumberOfUsers(): Observable<number>{
    return this.http.get<number>(environment.apiHost + "api/user/number-of-users");
  }

  blockUser(id: number): Observable<any>{
    return this.http.put(environment.apiHost + "api/user/" + id + "/block", null);
  }
}
