import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Passenger } from 'src/app/models/Passenger';
@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient) { }


  get(passengerId:number):Observable<Passenger>{
    return this.http.get<Passenger>(environment.apiHost+'api/passenger/' + passengerId);
    
  }

  getAll():Observable<Passenger[]>{
    return this.http.get<Passenger[]>(environment.apiHost + '/api/passenger');
  }
}
