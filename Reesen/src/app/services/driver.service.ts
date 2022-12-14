import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models/Driver';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor() { }


  getDriver(driverId:number):Observable<Driver>{
    return this.http.get<
  }
}
