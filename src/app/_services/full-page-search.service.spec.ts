import { TestBed } from '@angular/core/testing';

import { FullPageSearchService } from './full-page-search.service';

describe('FullPageSearchService', () => {
  let service: FullPageSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullPageSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
