import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverVehicleRegistrationComponent } from './driver-vehicle-registration.component';

describe('DriverVehicleRegistrationComponent', () => {
  let component: DriverVehicleRegistrationComponent;
  let fixture: ComponentFixture<DriverVehicleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverVehicleRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverVehicleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
