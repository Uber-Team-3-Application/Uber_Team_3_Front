import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetailComponent } from './ride-detail.component';

describe('RideDetailComponent', () => {
  let component: RideDetailComponent;
  let fixture: ComponentFixture<RideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
