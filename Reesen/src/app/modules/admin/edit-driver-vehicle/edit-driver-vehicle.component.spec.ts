import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverVehicleComponent } from './edit-driver-vehicle.component';

describe('EditDriverVehicleComponent', () => {
  let component: EditDriverVehicleComponent;
  let fixture: ComponentFixture<EditDriverVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDriverVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDriverVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
