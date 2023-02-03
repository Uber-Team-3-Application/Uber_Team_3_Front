import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedPanic, PanicDTO } from 'src/app/models/Panic';
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  constructor(private http: HttpClient) { }

  
  get():Observable<PaginatedPanic>{
    return this.http.get<PaginatedPanic>(environment.apiHost + 'api/panic');
  }
  getByRideId(rideId: number):Observable<PanicDTO>{
    return this.http.get<PanicDTO>(environment.apiHost + 'api/panic/' + rideId);
  }
}
