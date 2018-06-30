import { TestBed, inject } from '@angular/core/testing';

import { EquipesService } from './equipes.service';

describe('EquipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipesService]
    });
  });

  it('should be created', inject([EquipesService], (service: EquipesService) => {
    expect(service).toBeTruthy();
  }));
});
