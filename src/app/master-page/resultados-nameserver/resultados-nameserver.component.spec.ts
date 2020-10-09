import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosNameserverComponent } from './resultados-nameserver.component';

describe('ResultadosNameserverComponent', () => {
  let component: ResultadosNameserverComponent;
  let fixture: ComponentFixture<ResultadosNameserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosNameserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosNameserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
