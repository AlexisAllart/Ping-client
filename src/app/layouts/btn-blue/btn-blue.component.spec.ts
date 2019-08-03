import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBlueComponent } from './btn-blue.component';

describe('BtnBlueComponent', () => {
  let component: BtnBlueComponent;
  let fixture: ComponentFixture<BtnBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
