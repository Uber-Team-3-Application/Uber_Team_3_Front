import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRideSidebarComponent } from './filter-ride-sidebar.component';

describe('FilterRideSidebarComponent', () => {
  let component: FilterRideSidebarComponent;
  let fixture: ComponentFixture<FilterRideSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRideSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRideSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
