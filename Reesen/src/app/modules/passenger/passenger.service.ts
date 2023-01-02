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
    
  activatePassenger(id: number): Observable<any> {
    console.log(id)
    return this.http.get<any>(environment.apiHost+'api/passenger/activate/' + id);
  }

  activatePassengerAccount(id: number): Observable<any>{
    return this.http.get<String>(environment.apiHost+'api/passenger/activate/account' + id);
  }

  findByEmail(email: string): Observable<Passenger> {
    return this.http.get<Passenger>(environment.apiHost+'api/passenger/' + email);
  }

  get(passengerId:number):Observable<Passenger>{
    return this.http.get<Passenger>(environment.apiHost+'api/passenger/' + passengerId);
  }

  getAll():Observable<Passenger[]>{
    return this.http.get<Passenger[]>(environment.apiHost + '/api/passenger');
  }

  save(newPassenger: any) : Observable<any> {
      return this.http.post<string>(environment.apiHost + "api/passenger", newPassenger)
    }

  edit(passenger: Passenger, id:number): Observable<Passenger>{
    return this.http.put<Passenger>(environment.apiHost + "api/passenger/" + id, passenger)
  }

}
