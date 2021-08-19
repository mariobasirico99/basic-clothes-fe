import { TestBed } from '@angular/core/testing';

import { TipiService } from './tipi.service';

describe('TipiService', () => {
  let service: TipiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
