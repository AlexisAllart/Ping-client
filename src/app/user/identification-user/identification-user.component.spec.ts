import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationUserComponent } from './identification-user.component';

describe('IdentificationUserComponent', () => {
  let component: IdentificationUserComponent;
  let fixture: ComponentFixture<IdentificationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
