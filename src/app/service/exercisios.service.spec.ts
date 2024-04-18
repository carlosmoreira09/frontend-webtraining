import { TestBed } from '@angular/core/testing';

import { ExercisiosService } from './exercisios.service';

describe('ExercisiosService', () => {
  let service: ExercisiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
