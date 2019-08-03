import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWhiteComponent } from './input-white.component';

describe('InputWhiteComponent', () => {
  let component: InputWhiteComponent;
  let fixture: ComponentFixture<InputWhiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputWhiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
