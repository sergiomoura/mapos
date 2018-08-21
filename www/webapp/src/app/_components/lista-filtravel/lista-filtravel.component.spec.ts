import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFiltravelComponent } from './lista-filtravel.component';

describe('ListaFiltravelComponent', () => {
  let component: ListaFiltravelComponent;
  let fixture: ComponentFixture<ListaFiltravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFiltravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFiltravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
