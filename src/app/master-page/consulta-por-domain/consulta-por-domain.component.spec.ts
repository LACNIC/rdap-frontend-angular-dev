import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPorDomainComponent } from './consulta-por-domain.component';

describe('ConsultaPorDomainComponent', () => {
  let component: ConsultaPorDomainComponent;
  let fixture: ComponentFixture<ConsultaPorDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPorDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPorDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
