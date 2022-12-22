import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerProfileEditComponent } from './passenger-profile-edit.component';

describe('PassengerProfileEditComponent', () => {
  let component: PassengerProfileEditComponent;
  let fixture: ComponentFixture<PassengerProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerProfileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
