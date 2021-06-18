import { TestBed } from '@angular/core/testing';

import { EmployeePaginationService } from './employee-pagination.service';

describe('EmployeePaginationService', () => {
  let service: EmployeePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
