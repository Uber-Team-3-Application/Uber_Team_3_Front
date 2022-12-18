import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditPasswordComponent } from './driver-edit-password.component';

describe('DriverEditPasswordComponent', () => {
  let component: DriverEditPasswordComponent;
  let fixture: ComponentFixture<DriverEditPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
