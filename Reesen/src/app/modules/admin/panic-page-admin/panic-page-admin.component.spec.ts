import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicPageAdminComponent } from './panic-page-admin.component';

describe('PanicPageAdminComponent', () => {
  let component: PanicPageAdminComponent;
  let fixture: ComponentFixture<PanicPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicPageAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
