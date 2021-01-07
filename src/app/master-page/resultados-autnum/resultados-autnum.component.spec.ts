import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosAutnumComponent } from './resultados-autnum.component';

describe('ResultadosAutnumComponent', () => {
  let component: ResultadosAutnumComponent;
  let fixture: ComponentFixture<ResultadosAutnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosAutnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosAutnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
