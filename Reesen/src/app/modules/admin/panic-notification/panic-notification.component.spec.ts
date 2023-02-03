import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicNotificationComponent } from './panic-notification.component';

describe('PanicNotificationComponent', () => {
  let component: PanicNotificationComponent;
  let fixture: ComponentFixture<PanicNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
