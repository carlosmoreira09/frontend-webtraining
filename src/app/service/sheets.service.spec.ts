import {TestBed} from '@angular/core/testing';

import {SheetsService} from './sheets.service';

describe('PlanilhasService', () => {
  let service: SheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
