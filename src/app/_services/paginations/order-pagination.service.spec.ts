import { TestBed } from '@angular/core/testing';

import { OrderPaginationService } from './order-pagination.service';

describe('OrderPaginationService', () => {
  let service: OrderPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
