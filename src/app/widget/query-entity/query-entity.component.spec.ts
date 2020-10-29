import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryEntityComponent } from './query-entity.component';

describe('QueryEntityComponent', () => {
  let component: QueryEntityComponent;
  let fixture: ComponentFixture<QueryEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
