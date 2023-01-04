import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyEarnedComponent } from './money-earned.component';

describe('MoneyEarnedComponent', () => {
  let component: MoneyEarnedComponent;
  let fixture: ComponentFixture<MoneyEarnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyEarnedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyEarnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
