import { TestBed } from '@angular/core/testing';

import { TokenDecoderService } from './token-decoder.service';

describe('TokenDecoderService', () => {
  let service: TokenDecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenDecoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
