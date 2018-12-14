import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReportFormComponent } from './new-report-form.component';

describe('NewReportFormComponent', () => {
  let component: NewReportFormComponent;
  let fixture: ComponentFixture<NewReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
