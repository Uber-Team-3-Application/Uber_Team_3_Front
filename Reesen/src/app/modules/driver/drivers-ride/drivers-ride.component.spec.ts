import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversRideComponent } from './drivers-ride.component';

describe('DriversRideComponent', () => {
  let component: DriversRideComponent;
  let fixture: ComponentFixture<DriversRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
