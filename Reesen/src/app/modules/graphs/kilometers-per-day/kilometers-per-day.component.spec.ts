import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KilometersPerDayComponent } from './kilometers-per-day.component';

describe('KilometersPerDayComponent', () => {
  let component: KilometersPerDayComponent;
  let fixture: ComponentFixture<KilometersPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KilometersPerDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KilometersPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
