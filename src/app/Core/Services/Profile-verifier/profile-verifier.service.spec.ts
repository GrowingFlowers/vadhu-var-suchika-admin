import { TestBed } from '@angular/core/testing';

import { ProfileVerifierService } from './profile-verifier.service';

describe('ProfileVerifierService', () => {
  let service: ProfileVerifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileVerifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
