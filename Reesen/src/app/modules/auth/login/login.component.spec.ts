import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../unregistered-user/user.service';
import { AuthenticationService } from '../authentication.service';

import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  const userServiceSpy = jasmine.createSpyObj<UserService>(['findByEmail','resetPasswordLink','sendEmail']);
  const authenticationServiceSpy = jasmine.createSpyObj<AuthenticationService>(['login', 'setUser']);
  const routerSpy = jasmine.createSpyObj<Router>(['navigate']);

  beforeEach(() => {

  
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
      ],
      providers:[
        {provide: UserService, useValue: userServiceSpy},
        {provide: AuthenticationService, useValue: authenticationServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * 
   *  REACTIVE LOGIN VALIDATION FORM TESTING
   * 
   */
  it('form should be invalid', () =>{
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();

  });
  it('form should be valid', () =>{
    component.loginForm.controls['email'].setValue('nikolaj@gmail.com');
    component.loginForm.controls['password'].setValue('Nikolaj123');
    expect(component.loginForm.valid).toBeTruthy();

  });
  it('should call the login method', () =>{
    spyOn(component, 'login');
    el = fixture.debugElement.query(By.css('#confirmLogin')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  });
  
  it('should set has error to true', () =>{
    
    spyOn(component, 'login');
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    el = fixture.debugElement.query(By.css('#confirmLogin')).nativeElement;
    el.click();
    expect(component.hasError).toBeTruthy();
  });
  it('should set has error to false', () =>{
    
    spyOn(component, 'login');
    component.loginForm.controls['email'].setValue('nikolaj@gmail.com');
    component.loginForm.controls['password'].setValue('Nikolaj123');
    el = fixture.debugElement.query(By.css('#confirmLogin')).nativeElement;
    el.click();
    expect(component.hasError).toBeFalsy();
  });
  /**
   * 
   *  END OF REACTIVE LOGIN VALIDATION TESTING
   * 
   */


});
