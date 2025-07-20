import { TestBed } from '@angular/core/testing';

import { CabinServiceService } from './cabin.service.service';

describe('CabinServiceService', () => {
  let service: CabinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
