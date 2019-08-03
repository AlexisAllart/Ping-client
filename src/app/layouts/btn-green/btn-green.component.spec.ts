import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGreenComponent } from './btn-green.component';

describe('BtnGreenComponent', () => {
  let component: BtnGreenComponent;
  let fixture: ComponentFixture<BtnGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
