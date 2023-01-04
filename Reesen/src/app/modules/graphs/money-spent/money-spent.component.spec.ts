import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneySpentComponent } from './money-spent.component';

describe('MoneySpentComponent', () => {
  let component: MoneySpentComponent;
  let fixture: ComponentFixture<MoneySpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneySpentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneySpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
