import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCurrentRideComponent } from './passenger-current-ride.component';

describe('PassengerCurrentRideComponent', () => {
  let component: PassengerCurrentRideComponent;
  let fixture: ComponentFixture<PassengerCurrentRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerCurrentRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerCurrentRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
