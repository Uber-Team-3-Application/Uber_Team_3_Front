import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersRideComponent } from './passengers-ride.component';

describe('PassengersRideComponent', () => {
  let component: PassengersRideComponent;
  let fixture: ComponentFixture<PassengersRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
