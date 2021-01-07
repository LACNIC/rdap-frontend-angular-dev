import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSrchNameserversComponent } from './result-srch-nameservers.component';

describe('ResultSrchNameserversComponent', () => {
  let component: ResultSrchNameserversComponent;
  let fixture: ComponentFixture<ResultSrchNameserversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSrchNameserversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSrchNameserversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
