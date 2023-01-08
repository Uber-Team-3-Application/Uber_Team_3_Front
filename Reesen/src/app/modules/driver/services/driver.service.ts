import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Driver, DriverActivityDTO, DriverEditVehicleRequest, DriverEditBasicInfoRequest } from 'src/app/models/Driver';
import { Vehicle } from 'src/app/models/Vehicle';
import { HttpHeaders } from '@angular/common/http';
import {RidePaginated} from "../../../models/Ride";
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
    const driverActivityDTO: DriverActivityDTO = {
      active:isActive
    };
    return this.http.post(environment.apiHost + 'api/driver/'+ driverId + '/activity', driverActivityDTO);
  }

  edit(driver: Driver, id:number): Observable<Driver>{
    return this.http.put<Driver>(environment.apiHost + "api/driver/" + id, driver)
  }

  editAsAdmin(driver: Driver, id:number): Observable<Driver>{
    return this.http.put<Driver>(environment.apiHost + "api/driver/" + id + "/admin", driver)

  }

  getTotalEditRequests(): Observable<number>{
    return this.http.get<number>(environment.apiHost + "api/driver/total-edit-requests");
  }

  getProfileEditRequests(): Observable<DriverEditBasicInfoRequest[]>{
    return this.http.get<DriverEditBasicInfoRequest[]>(environment.apiHost + "api/driver/profile-edit-requests");
  }

  getVehicleEditRequests(): Observable<DriverEditVehicleRequest[]>{
    return this.http.get<DriverEditVehicleRequest[]>(environment.apiHost + "api/driver/vehicle-edit-requests");
  }

  declineVehicleEditRequest(id: number):Observable<string>{
      return this.http.delete<string>(environment.apiHost + "api/driver/" + id + "/decline-vehicle-edit-request");

  }

  declineProfileEditRequest(id: number):Observable<string>{
    return this.http.delete<string>(environment.apiHost + "api/driver/" + id + "/decline-profile-edit-request");

  }

  acceptVehicleEditRequest(id: number):Observable<string>{
    return this.http.put<string>(environment.apiHost + "api/driver/" + id + "/accept-vehicle-edit-request", {});

}

 acceptProfileEditRequest(id: number):Observable<string>{
  return this.http.put<string>(environment.apiHost + "api/driver/" + id + "/accept-profile-edit-request", {});
}

  getRidesOfSpecificDriver(id: number, sort?:string) : Observable<RidePaginated> {

    let queryParams = new HttpParams();
    if (sort != null) {
      queryParams = queryParams.append("sort", sort);
    }
    console.log(queryParams)
    return this.http.get<RidePaginated>(environment.apiHost + "api/driver/" + id + "/ride", {
      params: queryParams
    });
  }

}


