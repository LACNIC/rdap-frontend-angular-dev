import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryIpComponent } from './query-ip.component';

describe('QueryIpComponent', () => {
  let component: QueryIpComponent;
  let fixture: ComponentFixture<QueryIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
