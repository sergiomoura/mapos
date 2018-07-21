import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarNotaComponent } from './lancar-nota.component';

describe('LancarNotaComponent', () => {
  let component: LancarNotaComponent;
  let fixture: ComponentFixture<LancarNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancarNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
