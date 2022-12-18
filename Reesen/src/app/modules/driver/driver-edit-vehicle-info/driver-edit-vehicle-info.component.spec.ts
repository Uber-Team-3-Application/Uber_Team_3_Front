import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditVehicleInfoComponent } from './driver-edit-vehicle-info.component';

describe('DriverEditVehicleInfoComponent', () => {
  let component: DriverEditVehicleInfoComponent;
  let fixture: ComponentFixture<DriverEditVehicleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditVehicleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditVehicleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
