import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInboxComponent } from './driver-inbox.component';

describe('DriverInboxComponent', () => {
  let component: DriverInboxComponent;
  let fixture: ComponentFixture<DriverInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverInboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
