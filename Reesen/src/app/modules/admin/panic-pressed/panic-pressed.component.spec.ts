import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicPressedComponent } from './panic-pressed.component';

describe('PanicPressedComponent', () => {
  let component: PanicPressedComponent;
  let fixture: ComponentFixture<PanicPressedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicPressedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicPressedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
