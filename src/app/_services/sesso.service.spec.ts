import { TestBed } from '@angular/core/testing';

import { SessoService } from './sesso.service';

describe('SessoService', () => {
  let service: SessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
