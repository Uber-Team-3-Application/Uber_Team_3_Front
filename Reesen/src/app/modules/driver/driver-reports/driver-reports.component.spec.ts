import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverReportsComponent } from './driver-reports.component';

describe('DriverReportsComponent', () => {
  let component: DriverReportsComponent;
  let fixture: ComponentFixture<DriverReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
