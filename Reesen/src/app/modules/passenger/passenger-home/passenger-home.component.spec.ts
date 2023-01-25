import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerHomeComponent } from './passenger-home.component';

describe('PassengerHomeComponent', () => {
  let component: PassengerHomeComponent;
  let fixture: ComponentFixture<PassengerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
