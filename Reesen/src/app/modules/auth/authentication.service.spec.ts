import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/app/environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ AuthenticationService, JwtHelperService]
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should return an Observable of type Token', () =>{
    const credentials = {
      email: 'marko@gmail.com',
      password: 'Marko123'
    };
    const token = {
      access_token: ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8',
      refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8'
    };
    service.login(credentials).subscribe(
      result =>{
        console.log(result);
        expect(result['access_token']).toEqual(token['access_token']);
        expect(result['refresh_token']).toEqual(token['refresh_token']);
      }
    );

    const request = httpTestingController.expectOne(
      environment.apiHost + 'api/user/login'
    );
    expect(request.request.method).toEqual('POST');
    request.flush(token);
     
  });

  it('logout should return an Observable of type String', () =>{
    const response = 'Logout successful';
    service.logout().subscribe(
      result =>{
        expect(result).toEqual(response);
      }
    );
    const request = httpTestingController.expectOne(
      environment.apiHost + 'api/user/logout'
    );
    expect(request.request.method).toEqual('GET');
    request.flush(response, {status: 200, statusText: 'OK'});
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem('user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8');
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('user');
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should return the role of the logged in user', () => {
    localStorage.setItem('user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8');
    const role = 'ADMIN';
    const helper = new JwtHelperService();
    spyOn(helper, 'decodeToken').and.returnValue({ role: [{ authority: role }] });
    expect(service.getRole()).toEqual(role);
  });
  it('should return null if there is no logged in user', () => {
    localStorage.removeItem('user');
    expect(service.getRole()).toBeNull();
  });
});
