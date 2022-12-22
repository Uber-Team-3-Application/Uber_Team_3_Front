import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfoRegistrationComponent } from './driver-info-registration.component';

describe('DriverInfoRegistrationComponent', () => {
  let component: DriverInfoRegistrationComponent;
  let fixture: ComponentFixture<DriverInfoRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverInfoRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverInfoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
