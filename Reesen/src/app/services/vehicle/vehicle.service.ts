import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Vehicle } from 'src/app/models/Vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }


  get(driverId:number):Observable<Vehicle>{
    return this.http.get<Vehicle>(environment.apiHost+'api/driver/' + driverId + '/vehicle');
    
  }

}
