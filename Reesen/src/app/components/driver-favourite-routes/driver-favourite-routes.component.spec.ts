import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFavouriteRoutesComponent } from './driver-favourite-routes.component';

describe('DriverFavouriteRoutesComponent', () => {
  let component: DriverFavouriteRoutesComponent;
  let fixture: ComponentFixture<DriverFavouriteRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverFavouriteRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverFavouriteRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
