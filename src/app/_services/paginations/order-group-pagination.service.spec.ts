import { TestBed } from '@angular/core/testing';

import { OrderGroupPaginationService } from './order-group-pagination.service';

describe('OrderGroupPaginationService', () => {
  let service: OrderGroupPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGroupPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
