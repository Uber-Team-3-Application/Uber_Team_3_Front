import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { PaginatedDriver, Driver, DriverActivityDTO, DriverEditVehicleRequest, DriverEditBasicInfoRequest, WorkingHours } from 'src/app/models/Driver';
import { Vehicle } from 'src/app/models/Vehicle';
import { HttpHeaders } from '@angular/common/http';
import {RidePaginated} from "../../../models/Ride";
import {Document} from "../../../models/Document";
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private driverActivity$ = new BehaviorSubject<boolean>(true);
  driverActivityValue$ = this.driverActivity$.asObservable();

  setRideStatus(test: boolean) {
    this.driverActivity$.next(test);
    if(test === true){

    }else{

    }
  }

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

  getAll():Observable<PaginatedDriver>{
    return this.http.get<PaginatedDriver>(environment.apiHost + 'api/driver');
  }
  getDriversVehicle(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
  }

  changeActivity(driverId: number, isActive: boolean){
    const driverActivityDTO: DriverActivityDTO = {
      active:isActive
    };
    return this.http.post<string>(environment.apiHost + 'api/driver/'+ driverId + '/activity', driverActivityDTO);
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

  getDocuments(driverId : number): Observable<Document[]> {
    return this.http.get<Document[]>(environment.apiHost + "api/driver/" + driverId + "/documents");
  }

  saveDocument(driverId : number, doc : Document) : Observable<Document> {
    return this.http.post<Document>(environment.apiHost + "api/driver/" + driverId + "/documents", doc);
  }

  deleteDocument(documentId : number) : Observable<string> {
    return this.http.delete<string>(environment.apiHost + "api/driver/document/" + documentId);
  }

  createWorkingHours(driverId: number, date: Date): Observable<WorkingHours>{
    return this.http.post<WorkingHours>(environment.apiHost + "api/driver/" + driverId + "/working-hour", {start:date});

  }
  finishShift(workingHourId: number, date:Date): Observable<WorkingHours>{
    return this.http.put<WorkingHours>(environment.apiHost + "api/driver/working-hour/" + workingHourId, {end: date});

  }

  getRidesOfSpecificDriver(id: number, sort?:string, from?:string, to?:string, page?:number, size?:number) : Observable<RidePaginated> {

    let params = new HttpParams();

    if (sort != undefined)
      params = params.append("sort", sort);

    if (from != undefined) {
      let fromString = new Date(from).toISOString();
      params = params.append("from", fromString);
      let toString = new Date(to).toISOString();
      params = params.append("to", toString);
    }

    if (page != undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
     return this.http.get<RidePaginated>(environment.apiHost + "api/driver/" + id + "/ride", {
      params: params
    });
  }



}


