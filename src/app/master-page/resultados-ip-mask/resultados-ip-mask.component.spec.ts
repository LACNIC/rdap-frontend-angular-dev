import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosIpMaskComponent } from './resultados-ip-mask.component';

describe('ResultadosIpMaskComponent', () => {
  let component: ResultadosIpMaskComponent;
  let fixture: ComponentFixture<ResultadosIpMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosIpMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosIpMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
