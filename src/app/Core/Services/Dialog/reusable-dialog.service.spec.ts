import { TestBed } from '@angular/core/testing';

import { ReusableDialogService } from './reusable-dialog.service';

describe('ReusableDialogService', () => {
  let service: ReusableDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReusableDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
