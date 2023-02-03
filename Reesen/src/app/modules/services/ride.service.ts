import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Report } from 'src/app/models/Report';
import {CreateFavoriteRide, CreateRideDTO, FavoriteRide, mRide, Ride, RideWithVehicle} from 'src/app/models/Ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private rideStatusChanged$ = new BehaviorSubject<boolean>(false);
  rideStatusChangedValue$ = this.rideStatusChanged$.asObservable();


  setRideStatus(test: any) {
    this.rideStatusChanged$.next(test);
  }
  private rideAccepted$ = new BehaviorSubject<boolean>(false);
  rideAcceptedValue$ = this.rideAccepted$.asObservable();

  setRideAccepted(test: boolean) {
    this.rideAccepted$.next(test);
  }

  private activeRide$ = new BehaviorSubject<boolean>(false);
  activeRideValue$ = this.activeRide$.asObservable();

  private rideStarted$ = new BehaviorSubject<boolean>(false);
  isRideStarted$ = this.rideStarted$.asObservable();

  setRideStarted(started : boolean) {
    this.rideStarted$.next(started);
  }

  setActiveRide(test: boolean) {
    this.activeRide$.next(test);
  }

  private panicPressed$ = new BehaviorSubject<Ride>(null);
  panicPressedValue$ = this.panicPressed$.asObservable();
  setPanicPressed(panic: Ride){
    this.panicPressed$.next(panic);
  }

  private rideEnded$ = new BehaviorSubject<boolean>(false);
  rideEndedValue$ = this.rideEnded$.asObservable();
  setRideEnded(value:boolean){
    this.rideEnded$.next(value);
  }


  constructor(private http: HttpClient) { }


  get(rideId:number):Observable<Ride>{
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId);
  }

  getPromiseRide(rideId:number):Promise<Ride> {
    return this.http.get<Ride>(environment.apiHost + 'api/ride/' + rideId).toPromise();
  }

  getReport(role: string, typeOfReport: string, from:Date, to: Date, driverId : number = null): Observable<Report>{
    const reportDTO = {
      role:role,
      driverId:driverId,
      typeOfReport:typeOfReport,
      from:from,
      to:to
    };
    return this.http.post<Report>(environment.apiHost + 'api/ride/rides-report', reportDTO);
  }

  orderARide(ride: CreateRideDTO): Observable<Ride> {
    return this.http.post<Ride>(environment.apiHost + "api/ride/", ride);
  }

  addFavoriteRide(fav: CreateFavoriteRide): Observable<FavoriteRide>  {
    return this.http.post<FavoriteRide>(environment.apiHost + "api/ride/favorites", fav);
  }

  getFavoriteRides(): Observable<FavoriteRide[]> {
    return this.http.get<FavoriteRide[]>(environment.apiHost + "api/ride/favorites");
  }

  getActiveRide(): Observable<Ride> {
    return null;
  }

  cancelRide(rideId: number, rejection:string): Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + rideId + "/cancel", {reason:rejection});
  }

  acceptRide(id:number, ride:Ride): Observable<Ride> {
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + id + "/accept", ride);
  }

  startRide(id:number): Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + id + "/start", {});
  }

  endRide(id:number): Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost + "api/ride/" + id + "/end", {});
  }

  panicRide(id: number, reason: string) : Observable<Ride>{
    return this.http.put<Ride>(environment.apiHost + 'api/ride/' + id + '/panic', {reason:reason});
  }

  getAllActiveRidesWithIds():Observable<RideWithVehicle[]>{
    return this.http.get<RideWithVehicle[]>(environment.apiHost + 'api/ride/all-active-rides');
  }
}
