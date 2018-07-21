import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovimentoComponent } from './edit-movimento.component';

describe('EditMovimentoComponent', () => {
  let component: EditMovimentoComponent;
  let fixture: ComponentFixture<EditMovimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
