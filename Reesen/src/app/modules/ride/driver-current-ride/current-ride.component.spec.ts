import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRideComponent } from './current-ride.component';

describe('CurrentRideComponent', () => {
  let component: CurrentRideComponent;
  let fixture: ComponentFixture<CurrentRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
