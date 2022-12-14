import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor() { }


  getDriver(driverId:number):Observable<User>{
    
  }
}
