import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCurrentRideComponent } from './driver-current-ride.component';

describe('CurrentRideComponent', () => {
  let component: DriverCurrentRideComponent;
  let fixture: ComponentFixture<DriverCurrentRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCurrentRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCurrentRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
