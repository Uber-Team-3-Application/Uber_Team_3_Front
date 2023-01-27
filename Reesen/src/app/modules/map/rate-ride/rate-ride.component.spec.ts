import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRideComponent } from './rate-ride.component';

describe('RateRideComponent', () => {
  let component: RateRideComponent;
  let fixture: ComponentFixture<RateRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
