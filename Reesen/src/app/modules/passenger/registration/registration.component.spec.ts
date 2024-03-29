import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from '../../unregistered-user/user.service';
import { PassengerService } from '../passenger.service';

import { RegistrationComponent } from './registration.component';
import {Passenger} from "../../../models/Passenger";
import notEmpty = jasmine.notEmpty;
import {EmailInfo} from "../../../models/Email";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let passengerService: PassengerService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ RegistrationComponent ],
      providers: [ PassengerService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    passengerService = TestBed.get(PassengerService);
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should call save and activatePassenger when form is valid', () => {
    const passenger : Passenger = {
      profilePicture: "",
      name : 'name',
      surname: 'surname',
      address : 'address',
      email : 'test@test.com',
      telephoneNumber : '123456'
    }

    spyOn(passengerService, 'save').and.returnValue(of(passenger));
    component.registerForm.controls.phoneNumber.setValue('123456');
    component.registerForm.controls.email.setValue('test@test.com');
    component.registerForm.controls.address.setValue('address');
    component.registerForm.controls.name.setValue('name');
    component.registerForm.controls.surname.setValue('surname');
    component.registerForm.controls.password.setValue('password');
    component.registerForm.controls.repeatedPassword.setValue('password');
    component.register();
  });

  it('should set hasError to true when passwords do not match', () => {
    component.registerForm.controls.password.setValue('password');
    component.registerForm.controls.repeatedPassword.setValue('not password');
    component.register();
    expect(component.hasError).toBe(true);
  });

  it('should set hasError to true when form is invalid', () => {
    component.register();
    expect(component.hasError).toBe(true);
  });
});
