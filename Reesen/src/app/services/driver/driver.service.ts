import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Driver } from 'src/app/models/Driver';
import { Vehicle } from 'src/app/models/Vehicle';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }


  get(driverId:number):Observable<Driver>{
    return this.http.get<Driver>(environment.apiHost+'api/driver/' + driverId);
    
  }

  getAll():Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.apiHost + '/api/driver');
  }
  getDriversVehicle(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
  }

}


