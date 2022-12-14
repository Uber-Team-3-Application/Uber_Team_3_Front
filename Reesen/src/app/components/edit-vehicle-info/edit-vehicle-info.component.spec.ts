import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleInfoComponent } from './edit-vehicle-info.component';

describe('EditVehicleInfoComponent', () => {
  let component: EditVehicleInfoComponent;
  let fixture: ComponentFixture<EditVehicleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehicleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehicleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
