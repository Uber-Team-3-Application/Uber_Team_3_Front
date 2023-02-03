import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersInfoComponent } from './passenger-info.component';

describe('PassengersInfoComponent', () => {
  let component: PassengersInfoComponent;
  let fixture: ComponentFixture<PassengersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
