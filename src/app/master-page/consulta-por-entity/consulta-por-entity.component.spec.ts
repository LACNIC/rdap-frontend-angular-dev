import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPorEntityComponent } from './consulta-por-entity.component';

describe('ConsultaPorEntityComponent', () => {
  let component: ConsultaPorEntityComponent;
  let fixture: ComponentFixture<ConsultaPorEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPorEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPorEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
