import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRideComponent } from './accept-ride.component';

describe('AcceptRideComponent', () => {
  let component: AcceptRideComponent;
  let fixture: ComponentFixture<AcceptRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
