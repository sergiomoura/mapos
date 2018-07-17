import { TestBed, inject } from '@angular/core/testing';

import { DomasasService } from './domasas.service';

describe('DomasasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomasasService]
    });
  });

  it('should be created', inject([DomasasService], (service: DomasasService) => {
    expect(service).toBeTruthy();
  }));
});
