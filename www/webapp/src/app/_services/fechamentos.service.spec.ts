import { TestBed, inject } from '@angular/core/testing';

import { FechamentosService } from './fechamentos.service';

describe('FechamentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FechamentosService]
    });
  });

  it('should be created', inject([FechamentosService], (service: FechamentosService) => {
    expect(service).toBeTruthy();
  }));
});
