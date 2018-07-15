import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsesMapComponent } from './sses-map.component';

describe('SsesMapComponent', () => {
  let component: SsesMapComponent;
  let fixture: ComponentFixture<SsesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
