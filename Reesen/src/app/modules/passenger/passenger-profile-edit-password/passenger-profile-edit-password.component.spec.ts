import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerProfileEditPasswordComponent } from './passenger-profile-edit-password.component';

describe('PassengerProfileEditPasswordComponent', () => {
  let component: PassengerProfileEditPasswordComponent;
  let fixture: ComponentFixture<PassengerProfileEditPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerProfileEditPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerProfileEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
