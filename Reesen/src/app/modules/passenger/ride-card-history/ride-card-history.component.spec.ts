import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCardHistoryComponent } from './ride-card-history.component';

describe('RideCardHistoryComponent', () => {
  let component: RideCardHistoryComponent;
  let fixture: ComponentFixture<RideCardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideCardHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideCardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
