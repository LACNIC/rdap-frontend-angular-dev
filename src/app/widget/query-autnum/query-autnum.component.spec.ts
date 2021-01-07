import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAutnumComponent } from './query-autnum.component';

describe('QueryAutnumComponent', () => {
  let component: QueryAutnumComponent;
  let fixture: ComponentFixture<QueryAutnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAutnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAutnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
