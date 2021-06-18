import { TestBed } from '@angular/core/testing';

import { FinalBalanceService } from './final-balance.service';

describe('FinalBalanceService', () => {
  let service: FinalBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
