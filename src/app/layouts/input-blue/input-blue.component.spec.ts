import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBlueComponent } from './input-blue.component';

describe('InputBlueComponent', () => {
  let component: InputBlueComponent;
  let fixture: ComponentFixture<InputBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
