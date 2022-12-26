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

  saveDriver(newDriver: any) : Observable<Driver> {
    return this.http.post<Driver>(environment.apiHost + "api/driver", newDriver)
  }

  addVehicleToTheDriver(driverId: number, vehicle: Vehicle) : Observable<Vehicle>{
    return this.http.post<Vehicle>(environment.apiHost + "api/driver/" + driverId + "/vehicle", vehicle);
  }

  get(driverId:number):Observable<Driver>{
    return this.http.get<Driver>(environment.apiHost+'api/driver/' + driverId);

  }

  getAll():Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.apiHost + '/api/driver');
  }
  getDriversVehicle(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
  }

  changeActivity(driverId: number, isActive: boolean){
    let retVal = {
      isActive : isActive
    }
    console.log({"isActive": isActive})
    return this.http.put<string>(environment.apiHost + 'api/driver/'+ driverId + '/activity', {"isActive" : isActive});
  }

}


