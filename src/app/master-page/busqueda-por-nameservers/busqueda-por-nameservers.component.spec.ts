import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPorNameserversComponent } from './busqueda-por-nameservers.component';

describe('BusquedaPorNameserversComponent', () => {
  let component: BusquedaPorNameserversComponent;
  let fixture: ComponentFixture<BusquedaPorNameserversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaPorNameserversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPorNameserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
