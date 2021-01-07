import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorEntitiesComponent } from './busqueda-por-entities.component';

describe('BusquedaPorEntitiesComponent', () => {
  let component: BusquedaPorEntitiesComponent;
  let fixture: ComponentFixture<BusquedaPorEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaPorEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPorEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
