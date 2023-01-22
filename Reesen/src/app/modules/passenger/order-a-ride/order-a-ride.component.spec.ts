import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderARideComponent } from './order-a-ride.component';

describe('OrderARideComponent', () => {
  let component: OrderARideComponent;
  let fixture: ComponentFixture<OrderARideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderARideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderARideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
