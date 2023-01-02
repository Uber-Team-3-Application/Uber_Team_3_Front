import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredUserNavbarComponent } from './unregistered-user-navbar.component';

describe('UnregisteredUserNavbarComponent', () => {
  let component: UnregisteredUserNavbarComponent;
  let fixture: ComponentFixture<UnregisteredUserNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredUserNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
