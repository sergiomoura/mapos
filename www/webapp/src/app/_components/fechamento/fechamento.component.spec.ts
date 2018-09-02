import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechamentoComponent } from './fechamento.component';

describe('FechamentoComponent', () => {
  let component: FechamentoComponent;
  let fixture: ComponentFixture<FechamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
