import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsesComponent } from './sses.component';

describe('SsesComponent', () => {
  let component: SsesComponent;
  let fixture: ComponentFixture<SsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
