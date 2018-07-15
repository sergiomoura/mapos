import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SsesGridComponent } from './sses-grid.component';

describe('SsesComponent', () => {
  let component: SsesGridComponent;
  let fixture: ComponentFixture<SsesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});