import { TestBed } from '@angular/core/testing';

import { StaffingPaginationService } from './staffing-pagination.service';

describe('StaffingPaginationService', () => {
  let service: StaffingPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffingPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
