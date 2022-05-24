import { TestBed } from '@angular/core/testing';

import { CheckAuthenticationGuard } from './check-authentication.guard';

describe('CheckAuthenticationGuard', () => {
  let guard: CheckAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
