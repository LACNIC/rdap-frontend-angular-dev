import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosDomainComponent } from './resultados-domain.component';

describe('ResultadosDomainComponent', () => {
  let component: ResultadosDomainComponent;
  let fixture: ComponentFixture<ResultadosDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
