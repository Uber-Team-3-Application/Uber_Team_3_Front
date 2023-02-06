import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/app/environment/environment';
import { UserService } from './user.service';
import { Remark, PageRemark } from 'src/app/models/Remark';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should call the block user method and return void', () => {
    const id = 1;
    userService.blockUser(id).subscribe(res => {
      expect(res).toBeFalsy();
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${id}/block`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });
  it('should call the unblock user method and return void', () => {
    const id = 1;
    userService.getUserIsBlocked(id).subscribe(res => {
      expect(res).toBe(true);
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${id}/is-blocked`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });
  it('should call the create remark method and return remark', () => {
    const userId = 1;
    const message = { message: 'Test message' };
    userService.createRemark(userId, message).subscribe(res => {
      expect(res).toEqual(message);
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${userId}/note`);
    expect(req.request.method).toBe('POST');
    req.flush(message);
  });

  it('should call the reset password method and return string', () => {
    const id = 1;
    const resetPasswordDTO = {newPassword: 'password' , code: 1234};

    userService.resetPassword(resetPasswordDTO, id).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${id}/resetPassword`);
    expect(req.request.method).toBe('PUT');
    req.flush(resetPasswordDTO);
  });

  it('should call the get remarks method and return remarks', () => {
    const id = 1;
    let remarks = new Array<Remark>;
    remarks.push({
      message: "Poruka",
      date: new Date()
    });

    let remarkPage: PageRemark = {
        totalCount: 1,
        results: remarks
        
    };
    
    userService.getRemarks(id, 0, 10).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${id}/note?page=${0}&size=${10}`);
    expect(req.request.method).toBe('GET');
    req.flush(remarkPage);
  });

  it('should call the get user is blocked and return false', () => {
    const userId = 1;
    const isBlocked = false;
    userService.getUserIsBlocked(userId).subscribe(res => {
      expect(res).toEqual(isBlocked);
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${userId}/is-blocked`);
    expect(req.request.method).toBe('GET');
    req.flush(isBlocked);
  });
  it('should call the get user is blocked and return true', () => {
    const userId = 1;
    const isBlocked = true;
    userService.getUserIsBlocked(userId).subscribe(res => {
      expect(res).toEqual(isBlocked);
    });
    const req = httpMock.expectOne(`${environment.apiHost}api/user/${userId}/is-blocked`);
    expect(req.request.method).toBe('GET');
    req.flush(isBlocked);
  });

  
});
