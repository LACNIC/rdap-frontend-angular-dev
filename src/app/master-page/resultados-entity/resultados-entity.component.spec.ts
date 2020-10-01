import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosEntityComponent } from './resultados-entity.component';

describe('ResultadosEntityComponent', () => {
  let component: ResultadosEntityComponent;
  let fixture: ComponentFixture<ResultadosEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
