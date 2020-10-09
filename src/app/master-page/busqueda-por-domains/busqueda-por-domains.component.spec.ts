import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorDomainsComponent } from './busqueda-por-domains.component';

describe('BusquedaPorDomainsComponent', () => {
  let component: BusquedaPorDomainsComponent;
  let fixture: ComponentFixture<BusquedaPorDomainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaPorDomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPorDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
