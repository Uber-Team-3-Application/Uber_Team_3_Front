import { TestBed } from '@angular/core/testing';

import { PassengerService } from './passenger.service';
import {environment} from "../../environment/environment";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "../unregistered-user/user.service";
import {Passenger} from "../../models/Passenger";

describe('PassengerService', () => {
  let service: PassengerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PassengerService]
    });
    service = TestBed.inject(PassengerService);
    httpMock = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return passengers', () => {

    service.getAll().subscribe(users => {
      expect(users).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(environment.apiHost + "api/passenger");
    expect(req.request.method).toEqual('GET');
  });


 it('should save new passenger', () => {
   const passenger: Passenger = {
     name : "Milutin",
     surname : "Milutinovic",
     profilePicture : "profilna",
     telephoneNumber : "0216212345",
     email : "milutin@gmail.com",
     address : "Proleterska 7",
     password : "Milutin123",
     active : false
   };
   service.save(passenger).subscribe(res => {
     expect(res.email).toEqual("milutin@gmail.com");
     expect(res.name).toEqual("Milutin");
     expect(res.surname).toEqual("Milutinovic");
     expect(res.profilePicture).toEqual("profilna");
     expect(res.address).toEqual("Proleterska 7");
   });
  const req = httpMock.expectOne(environment.apiHost + "api/passenger");
  expect(req.request.method).toEqual('POST');
  req.flush(passenger);

})


  it('should edit passenger', () => {
    const passenger: Passenger = {
      name : "Mirko",
      surname : "Milutinovic",
      profilePicture : "profilna",
      telephoneNumber : "0216212345",
      email : "mirko@gmail.com",
      address : "Rajfajzenova 12, Novi Sad",
      password : "Mirko123",
      active : false
    };
    service.edit(passenger, 1).subscribe(res => {
      expect(res.email).toEqual("mirko@gmail.com");
      expect(res.name).toEqual("Mirko");
      expect(res.surname).toEqual("Milutinovic");
      expect(res.profilePicture).toEqual("profilna");
      expect(res.address).toEqual("Rajfajzenova 12, Novi Sad");
    });
    const req = httpMock.expectOne(environment.apiHost + "api/passenger/" + 1);

    expect(req.request.method).toEqual('PUT');
    req.flush(passenger);

  })

  it('should get rides by passenger id', () => {
    service.getRides(4).subscribe(rides => {
      expect(rides).toHaveSize(4);
    })
    const req = httpMock.expectOne(environment.apiHost + "api/passenger/" + 4 + "/ride");
    expect(req.request.method).toEqual('GET');
  })

  it('should call findByEmail and return passenger', () => {
    const testEmail = 'test@example.com';
    const testPassengerId = 1;
    const mockPassenger: Passenger = {
      id: testPassengerId,
      name: 'John',
      surname: 'Doe',
      profilePicture: 'https://example.com/profile-picture.jpg',
      telephoneNumber: '+1 123 456 7890',
      email: 'test@example.com',
      address: '123 Main Street, Anytown USA 12345',
      password: 'password123',
      blocked: false,
      active: true,
      isConfirmedEmail: true,
      amountOfMoney: 100.0,
    };

    service.findByEmail(testEmail).subscribe(passenger => {
      expect(passenger).toEqual(mockPassenger);
    });

    const req = httpMock.expectOne(`${environment.apiHost}api/passenger/${testEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPassenger);
  });

  it('should call get and return passenger', () => {
    const testPassengerId = 1;
    const mockPassenger: Passenger = {
      id: testPassengerId,
      name: 'John',
      surname: 'Doe',
      profilePicture: 'https://example.com/profile-picture.jpg',
      telephoneNumber: '+1 123 456 7890',
      email: 'john.doe@example.com',
      address: '123 Main Street, Anytown USA 12345',
      password: 'password123',
      blocked: false,
      active: true,
      isConfirmedEmail: true,
      amountOfMoney: 100.0,
    };

    service.get(testPassengerId).subscribe(passenger => {
      expect(passenger).toEqual(mockPassenger);
    });

    const req = httpMock.expectOne(`${environment.apiHost}api/passenger/${testPassengerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPassenger);
  });

  it('should call activatePassenger and return string for activation', () => {
    const testPassengerId = 1;
    const mockResponse = 'Passenger activated';

    service.activatePassenger(testPassengerId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiHost}api/passenger/activate/${testPassengerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('should call activateAccount and return url', () => {
    const testUrl = 'https://example.com/activate/account';
    const mockResponse = 'Account activated';

    service.activateAccount(testUrl).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiHost}api/passenger/activate/account?url=${testUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('should return a paginated list of rides for a given passenger', () => {
    const passengerId = 2;
    const page = 1;
    const size = 1;
    const sort = 'asc';
    const from = '2022-01-01';
    const to = '2022-12-31';

    service.getRidesOfPassenger(passengerId, sort, from, to, page, size).subscribe(rides => {
      expect(rides).toBeTruthy();
      expect(rides.totalCount).toEqual(1);
      expect(rides.results.length).toEqual(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiHost}api/passenger/${passengerId}/ride?sort=${sort}&from=${from}&to=${to}&page=${page}&size=${size}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush({
      totalCount: 1,
      results: [
        {
          status: 'completed',
          id: 1,
          startTime: '2022-01-01T12:00:00',
          endTime: '2022-01-01T12:30:00',
          totalCost: 15,
          driver: { id: 1, name: 'John Doe' },
          passengers: [{ id: 2, name: 'Jane Doe' }],
          estimatedTimeInMinutes: 30,
          vehicleType: 'STANDARD',
          babyTransport: false,
          petTransport: false,
          locations: [{ lat: 37.7749, lng: -122.4194 }],
          reviews: [{ id: 1, rating: 5, comment: 'Great ride!' }],
          scheduledTime: '2022-01-01T12:00:00'
        }
      ]
    });
  });


})
