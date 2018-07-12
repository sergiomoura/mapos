import { TestBed, inject } from '@angular/core/testing';

import { SsesService } from './sses.service';

describe('SsesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SsesService]
    });
  });

  it('should be created', inject([SsesService], (service: SsesService) => {
    expect(service).toBeTruthy();
  }));
});
