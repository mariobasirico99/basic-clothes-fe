import { TestBed } from '@angular/core/testing';

import { OrderGroupFilterService } from './order-group-filter.service';

describe('OrderGroupFilterService', () => {
  let service: OrderGroupFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGroupFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
