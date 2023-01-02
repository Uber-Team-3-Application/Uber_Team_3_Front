import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCardHistoryResponsiveComponent } from './driver-card-history-responsive.component';

describe('DriverCardHistoryResponsiveComponent', () => {
  let component: DriverCardHistoryResponsiveComponent;
  let fixture: ComponentFixture<DriverCardHistoryResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCardHistoryResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCardHistoryResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
