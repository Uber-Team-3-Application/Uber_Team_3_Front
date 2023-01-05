import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Vehicle, VehicleType } from 'src/app/models/Vehicle';
import { VehicleLocationWithAvailibility } from 'src/app/models/Location';
import { Location } from 'src/app/models/Location';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }


  get(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle');
    
  }

  getVehicleTypes():Observable<VehicleType[]>{
    return this.http.get<VehicleType[]>(environment.apiHost + 'api/vehicle/types');
  }


  getAllLocations():Observable<VehicleLocationWithAvailibility[]>{
    return this.http.get<VehicleLocationWithAvailibility[]>(environment.apiHost + 'api/vehicle/vehicle-locations');
  }

  edit(vehicle: Vehicle, id:number): Observable<Vehicle>{
    return this.http.put<Vehicle>(environment.apiHost + "api/driver/" + id + "/vehicle", vehicle);
  }

  editAsAdmin(vehicle: Vehicle, id:number): Observable<Vehicle>{
    return this.http.put<Vehicle>(environment.apiHost + "api/driver/" + id + "/vehicle-admin", vehicle);
  }

  getVehicleLocation(vehicleId: number):Observable<Location>{
    return this.http.get<Location>(environment.apiHost + 'api/vehicle/' + vehicleId + '/location');
  }

}
