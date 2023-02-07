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


})
