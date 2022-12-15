import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '@angular/compiler';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environment/environment';
import {JwtHelperService} from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip:'true',
  })


  constructor(private http:HttpClient) { }

  login(auth:any):Observable<Token>{
    return this.http.post<Token>(environment.apiHost + 'api/user/login', auth, {
      headers:this.headers,
    });

  }

  logout():Observable<string>{

      return this.http.get(environment.apiHost + 'api/user/logout',{
        responseType:'text',
      });

  }

  isLoggedIn(): boolean{
    return false;
  }

  getRole():any{
    if(this.isLoggedIn()){
      return 'role';
    }
    return null;
  }


}


