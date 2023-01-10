import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Passenger } from 'src/app/models/Passenger';
import { Ride, RidePaginated } from 'src/app/models/Ride';
@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  getRidesOfPassenger(id: number, sort?:string, from?:string, to?:string, page?:number, size?:number) : Observable<RidePaginated> {

    let params = new HttpParams();

    if (sort != undefined)
      params = params.append("sort", sort);

    if (from != undefined) {
      params = params.append("from", from);
      params = params.append("to", to);
    }

    if (page != undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
     return this.http.get<RidePaginated>(environment.apiHost + "api/passenger/" + id + "/ride", {
      params: params
    });
  }

  constructor(private http: HttpClient) { }
    
  activatePassenger(id: number): Observable<string> {
    return this.http.get<string>(environment.apiHost+'api/passenger/activate/' + id, {responseType: 'text' as 'json'});
  }

  activateAccount(url: string): Observable<string> {
    let params = new HttpParams().set('url', url);
    return this.http.get<string>(environment.apiHost+'api/passenger/activate/account', { params });
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

  save(newPassenger: any) : Observable<Passenger> {
      return this.http.post<Passenger>(environment.apiHost + "api/passenger", newPassenger)
    }

  edit(passenger: Passenger, id:number): Observable<Passenger>{
    return this.http.put<Passenger>(environment.apiHost + "api/passenger/" + id, passenger)
  }

  getRides(passengerId: number): Observable<Ride[]> {
    return this.http.get<Ride[]>(environment.apiHost + "api/passenger/" + passengerId + "/ride")
  }

}
