import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerReportsComponent } from './passenger-reports.component';

describe('PassengerReportsComponent', () => {
  let component: PassengerReportsComponent;
  let fixture: ComponentFixture<PassengerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
