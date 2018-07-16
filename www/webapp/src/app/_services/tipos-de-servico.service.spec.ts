import { TestBed, inject } from '@angular/core/testing';

import { TiposDeServicoService } from './tipos-de-servico.service';

describe('TiposDeServicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposDeServicoService]
    });
  });

  it('should be created', inject([TiposDeServicoService], (service: TiposDeServicoService) => {
    expect(service).toBeTruthy();
  }));
});
