import { TestBed } from '@angular/core/testing';

import { TaglieService } from './taglie.service';

describe('TaglieService', () => {
  let service: TaglieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaglieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
