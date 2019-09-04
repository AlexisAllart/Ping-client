import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusmodalComponent } from './statusmodal.component';

describe('StatusmodalComponent', () => {
  let component: StatusmodalComponent;
  let fixture: ComponentFixture<StatusmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
