import { TestBed } from '@angular/core/testing';

import { PlanilhasService } from './planilhas.service';

describe('PlanilhasService', () => {
  let service: PlanilhasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanilhasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
