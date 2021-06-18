import { TestBed } from '@angular/core/testing';

import { EmployeeContractPaginationService } from './employee-contract-pagination.service';

describe('EmployeeContractPaginationService', () => {
  let service: EmployeeContractPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContractPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
