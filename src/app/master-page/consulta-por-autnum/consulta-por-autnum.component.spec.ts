import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPorAutnumComponent } from './consulta-por-autnum.component';

describe('ConsultaPorAutnumComponent', () => {
  let component: ConsultaPorAutnumComponent;
  let fixture: ComponentFixture<ConsultaPorAutnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPorAutnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPorAutnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
