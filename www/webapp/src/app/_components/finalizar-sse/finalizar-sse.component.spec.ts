import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarSseComponent } from './finalizar-sse.component';

describe('FinalizarSseComponent', () => {
  let component: FinalizarSseComponent;
  let fixture: ComponentFixture<FinalizarSseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarSseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarSseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
