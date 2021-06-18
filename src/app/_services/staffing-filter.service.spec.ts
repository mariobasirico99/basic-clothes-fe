import { TestBed } from '@angular/core/testing';

import { StaffingFilterService } from './staffing-filter.service';

describe('StaffingFilterService', () => {
  let service: StaffingFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffingFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
