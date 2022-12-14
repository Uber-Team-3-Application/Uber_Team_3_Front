import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Driver } from '../models/Driver';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }


  get(driverId:number):Observable<Driver>{
    return this.http.get<Driver>(environment.apiHost+'/api/driver/' + driverId);
    
  }

  getAll():Observable<Driver[]>{
    return this.http.get<Driver[]>(environment.apiHost + '/api/driver');
  }
}
