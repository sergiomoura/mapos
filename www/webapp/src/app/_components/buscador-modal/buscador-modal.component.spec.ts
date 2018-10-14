import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorModalComponent } from './buscador-modal.component';

describe('BuscadorModalComponent', () => {
  let component: BuscadorModalComponent;
  let fixture: ComponentFixture<BuscadorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
