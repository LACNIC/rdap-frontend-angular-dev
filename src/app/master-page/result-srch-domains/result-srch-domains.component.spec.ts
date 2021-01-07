import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSrchDomainsComponent } from './result-srch-domains.component';

describe('ResultSrchDomainsComponent', () => {
  let component: ResultSrchDomainsComponent;
  let fixture: ComponentFixture<ResultSrchDomainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSrchDomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSrchDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
