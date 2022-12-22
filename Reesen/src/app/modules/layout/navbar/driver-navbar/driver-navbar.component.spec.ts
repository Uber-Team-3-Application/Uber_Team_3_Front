import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNavbarComponent } from './driver-navbar.component';

describe('DriverNavbarComponent', () => {
  let component: DriverNavbarComponent;
  let fixture: ComponentFixture<DriverNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
