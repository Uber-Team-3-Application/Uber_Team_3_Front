import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideMapComponent } from './ride-map.component';

describe('RideMapComponent', () => {
  let component: RideMapComponent;
  let fixture: ComponentFixture<RideMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
