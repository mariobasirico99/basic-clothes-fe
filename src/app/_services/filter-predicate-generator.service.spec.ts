import { TestBed } from '@angular/core/testing';

import { FilterPredicateGeneratorService } from './filter-predicate-generator.service';

describe('FilterPredicateGeneratorService', () => {
  let service: FilterPredicateGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPredicateGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
