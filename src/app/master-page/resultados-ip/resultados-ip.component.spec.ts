import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosIpComponent } from './resultados-ip.component';

describe('ResultadosIpComponent', () => {
  let component: ResultadosIpComponent;
  let fixture: ComponentFixture<ResultadosIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
