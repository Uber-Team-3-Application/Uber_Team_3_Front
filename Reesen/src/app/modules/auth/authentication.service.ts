import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token } from '@angular/compiler';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import {JwtHelperService} from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip:'true',
  })

  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http:HttpClient) {
    this.user$.next(this.getRole());
   }


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
    if(localStorage.getItem('user') != null) return true;

    return false;
  }

  getRole():any{
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const role = helper.decodeToken(accessToken).role[0].authority;
      return role;
    }
    return null;
  }

  setUser(): void{
    this.user$.next(this.getRole());
  }



}


