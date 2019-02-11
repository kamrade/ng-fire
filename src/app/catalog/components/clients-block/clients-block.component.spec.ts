import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsBlockComponent } from './clients-block.component';

describe('ClientsBlockComponent', () => {
  let component: ClientsBlockComponent;
  let fixture: ComponentFixture<ClientsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
