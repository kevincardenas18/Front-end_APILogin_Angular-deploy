import { TestBed } from '@angular/core/testing';

import { EmisorService } from './emisor.service';

describe('EmisorService', () => {
  let service: EmisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
