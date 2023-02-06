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

  it('should return the decoded access token with role ADMIN', () => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8';
    localStorage.setItem('user', testToken);

    const decodedToken = service.getDecodedAccesToken();
    expect(decodedToken).toEqual({ role: [{ authority: 'ADMIN' }] });
  });

  it('should return null when no access token is found', () => {
    localStorage.removeItem('user');
    const decodedToken = service.getDecodedAccesToken();
    expect(decodedToken).toBeNull();
  });
});
