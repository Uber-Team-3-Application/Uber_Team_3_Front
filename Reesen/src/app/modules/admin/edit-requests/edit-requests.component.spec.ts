import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestsComponent } from './edit-requests.component';

describe('EditRequestsComponent', () => {
  let component: EditRequestsComponent;
  let fixture: ComponentFixture<EditRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
