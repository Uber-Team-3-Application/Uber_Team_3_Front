import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCardHistoryComponent } from './driver-card-history.component';

describe('DriverCardHistoryComponent', () => {
  let component: DriverCardHistoryComponent;
  let fixture: ComponentFixture<DriverCardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCardHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
