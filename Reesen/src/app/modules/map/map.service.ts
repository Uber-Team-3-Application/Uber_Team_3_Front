import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Ride, RideSimulationDTO } from 'src/app/models/Ride';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  private departure$ = new BehaviorSubject<string>('');
  departureValue$ = this.departure$.asObservable();
  
  setDeparture(test: string) {
    this.departure$.next(test);
  }

  private destination$ = new BehaviorSubject<string>('');
  destinationValue$ = this.destination$.asObservable();
  
  setDestination(test: string) {
    this.destination$.next(test);
  }
  private rideAccepted$ = new BehaviorSubject<boolean>(false);
  rideAcceptedValue$ = this.rideAccepted$.asObservable();
  setRideAccepted(test:boolean){
    this.rideAccepted$.next(test);
  }

  private rideInProgress$ = new BehaviorSubject<boolean>(false);
  rideInProgressValue$ = this.rideInProgress$.asObservable();

  setRideInProgress(test:boolean){
    this.rideInProgress$.next(test);
  }


  private rideDenied$ = new BehaviorSubject<boolean>(false);
  rideDeniedValue$ = this.rideDenied$.asObservable();

  setRideDenied(test:boolean){
    this.rideDenied$.next(test);
  }


  
  constructor(private http: HttpClient) { }

  search(street: string): Observable<any>{
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }
}
