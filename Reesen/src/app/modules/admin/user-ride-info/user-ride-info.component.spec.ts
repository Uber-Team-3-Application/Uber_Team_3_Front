import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRideInfoComponent } from './user-ride-info.component';

describe('UserRideInfoComponent', () => {
  let component: UserRideInfoComponent;
  let fixture: ComponentFixture<UserRideInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRideInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
