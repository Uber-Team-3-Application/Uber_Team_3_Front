import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { EmailInfo } from 'src/app/models/Email';
import { PageRemark, Remark } from 'src/app/models/Remark';
import { RideInfo, RideInfoBody, RidePaginated } from 'src/app/models/Ride';
import { PageUsers, User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // VELJA ->

  getRideAssumption(rideInfoBody: RideInfoBody):Observable<RideInfo>{
    return this.http.post<RideInfo>(environment.apiHost + "api/unregisteredUser/", rideInfoBody);
  }

  sendEmail(emailInfo: EmailInfo):Observable<EmailInfo>{
    return this.http.post<EmailInfo>(environment.apiHost + "api/user/mail", emailInfo);
  }
  updatePassword(id:number, newPassword:string, oldPassword:string): Observable<void>{
      return this.http.put<void>(environment.apiHost + "api/user/" + id + "/changePassword",
      {
        new_password: newPassword,
        old_password: oldPassword
      });
  }
  getUsers(page: number, size:number): Observable<PageUsers>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<PageUsers>(environment.apiHost + "api/user", {
      params:params
    });
  }


  getUsersByRole(page:number, size:number, role: string): Observable<PageUsers>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    if(role === "DRIVER")
      return this.http.get<PageUsers>(environment.apiHost + "api/driver", {
        params:params
      });
    else
    return this.http.get<PageUsers>(environment.apiHost + "api/passenger", {
      params:params
    });
  }

  getTotalNumberOfUsers(): Observable<number>{
    return this.http.get<number>(environment.apiHost + "api/user/number-of-users");
  }

    // VELJA DOVDE


    // VUGA ->

  blockUser(id: number): Observable<void>{
    return this.http.put<void>(environment.apiHost + "api/user/" + id + "/block", null);
  }
  unblockUser(id: number): Observable<void>{
    return this.http.put<void>(environment.apiHost + "api/user/" + id + "/unblock", null);
  }


  getUserIsBlocked(id: number): Observable<boolean>{
    return this.http.get<boolean>(environment.apiHost + "api/user/" + id + "/is-blocked");

  }


  createRemark(userId: number, message: Remark): Observable<Remark>{
    return this.http.post<Remark>(environment.apiHost + "api/user/" + userId + "/note", message);
  }
  getRemarks(userId: number, page: number, size: number): Observable<PageRemark>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    return this.http.get<PageRemark>(environment.apiHost + "api/user/" + userId + "/note",
    {params:params});
  }
  resetPassword(resetPasswordDTO: any, userId: number): Observable<string> {
    return this.http.put<string>(environment.apiHost+'api/user/' + userId + '/resetPassword', resetPasswordDTO);
  }

  // VUGA DOVDE

  //JELENA ->

  resetPasswordLink(userId: number) {
    return this.http.get<string>(environment.apiHost+'api/user/' + userId + '/resetPassword');
  }
  
  findByEmail(email: string): Observable<User> {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<User>(environment.apiHost + 'api/user/email', { params: params });
  }

  getRides(userId: number, page:number, size:number, sort:string, from:string, to:string): Observable<RidePaginated>{
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', sort);
    if(from !== null)
      params = params.append('from', from);
    if(to !== null)
      params = params.append('to', to);
    return this.http.get<RidePaginated>(environment.apiHost + 'api/user/' + userId + '/ride',
    {params: params});
  }

  getTotalNumberOfRidesForUser(id: number): Observable<number>{
    return this.http.get<number>(environment.apiHost + "api/user/" + id + '/number-of-rides');
  }
  // JELENA DOVDE
}