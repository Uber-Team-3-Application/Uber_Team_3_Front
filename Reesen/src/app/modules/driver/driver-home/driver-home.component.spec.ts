import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverHomeComponent } from './driver-home.component';

describe('DriverHomeComponent', () => {
  let component: DriverHomeComponent;
  let fixture: ComponentFixture<DriverHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
