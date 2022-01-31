import { TestBed } from '@angular/core/testing';

import { EotpsService } from './eotps.service';

describe('EotpsService', () => {
  let service: EotpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EotpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
