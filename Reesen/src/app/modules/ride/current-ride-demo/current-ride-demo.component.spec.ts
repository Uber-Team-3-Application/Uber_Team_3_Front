import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRideDemoComponent } from './current-ride-demo.component';

describe('CurrentRideDemoComponent', () => {
  let component: CurrentRideDemoComponent;
  let fixture: ComponentFixture<CurrentRideDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRideDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRideDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
