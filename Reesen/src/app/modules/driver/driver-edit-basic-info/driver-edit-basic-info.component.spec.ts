import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditBasicInfoComponent } from './driver-edit-basic-info.component';

describe('DriverEditBasicInfoComponent', () => {
  let component: DriverEditBasicInfoComponent;
  let fixture: ComponentFixture<DriverEditBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditBasicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
