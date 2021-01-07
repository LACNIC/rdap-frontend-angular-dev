import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPorNameserverComponent } from './consulta-por-nameserver.component';

describe('ConsultaPorNameserverComponent', () => {
  let component: ConsultaPorNameserverComponent;
  let fixture: ComponentFixture<ConsultaPorNameserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPorNameserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPorNameserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
