import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Driver } from 'src/app/models/Driver';
import { Vehicle } from 'src/app/models/Vehicle';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip:'true',
  })
  constructor(private http: HttpClient) { }

  saveDriver(newDriver: any) : Observable<any> {
    return this.http.post<string>(environment.apiHost + "api/driver", newDriver)
  }

  get(driverId:number):Observable<Driver>{
    return this.http.get<Driver>(environment.apiHost+'api/driver/' + driverId,
    {
      headers: this.headers
    }
    );

  }

  getAll():Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.apiHost + '/api/driver');
  }
  getDriversVehicle(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
  }

}


