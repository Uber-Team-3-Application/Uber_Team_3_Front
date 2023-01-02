import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRideHistoryComponent } from './user-ride-history.component';

describe('UserRideHistoryComponent', () => {
  let component: UserRideHistoryComponent;
  let fixture: ComponentFixture<UserRideHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRideHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRideHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
