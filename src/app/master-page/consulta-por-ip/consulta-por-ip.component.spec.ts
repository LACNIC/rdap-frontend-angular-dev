import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPorIpComponent } from './consulta-por-ip.component';

describe('ConsultaPorIpComponent', () => {
  let component: ConsultaPorIpComponent;
  let fixture: ComponentFixture<ConsultaPorIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPorIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPorIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
