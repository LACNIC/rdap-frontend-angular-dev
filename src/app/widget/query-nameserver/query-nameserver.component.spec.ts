import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNameserverComponent } from './query-nameserver.component';

describe('QueryNameserverComponent', () => {
  let component: QueryNameserverComponent;
  let fixture: ComponentFixture<QueryNameserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNameserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNameserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
