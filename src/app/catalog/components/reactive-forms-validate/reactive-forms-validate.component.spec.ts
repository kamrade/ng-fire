import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsValidateComponent } from './reactive-forms-validate.component';

describe('ReactiveFormsValidateComponent', () => {
  let component: ReactiveFormsValidateComponent;
  let fixture: ComponentFixture<ReactiveFormsValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveFormsValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
