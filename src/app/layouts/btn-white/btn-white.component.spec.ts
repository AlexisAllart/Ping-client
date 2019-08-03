import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnWhiteComponent } from './btn-white.component';

describe('BtnWhiteComponent', () => {
  let component: BtnWhiteComponent;
  let fixture: ComponentFixture<BtnWhiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnWhiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
