import { TestBed } from '@angular/core/testing';

import { PanicService } from './panic.service';

describe('PanicService', () => {
  let service: PanicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
