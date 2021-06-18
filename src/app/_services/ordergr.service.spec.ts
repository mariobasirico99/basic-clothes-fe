import { TestBed } from '@angular/core/testing';

import { OrdergrService } from './ordergr.service';

describe('OrdergrService', () => {
  let service: OrdergrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdergrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
