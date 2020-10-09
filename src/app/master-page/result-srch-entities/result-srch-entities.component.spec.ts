import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSrchEntitiesComponent } from './result-srch-entities.component';

describe('ResultSrchEntitiesComponent', () => {
  let component: ResultSrchEntitiesComponent;
  let fixture: ComponentFixture<ResultSrchEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSrchEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSrchEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
