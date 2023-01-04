import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesPerDayComponent } from './rides-per-day.component';

describe('RidesPerDayComponent', () => {
  let component: RidesPerDayComponent;
  let fixture: ComponentFixture<RidesPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidesPerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
