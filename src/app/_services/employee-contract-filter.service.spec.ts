import { TestBed } from '@angular/core/testing';

import { EmployeeContractFilterService } from './employee-contract-filter.service';

describe('EmployeeContractFilterService', () => {
  let service: EmployeeContractFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContractFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
