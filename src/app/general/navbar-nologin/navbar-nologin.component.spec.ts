import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNologinComponent } from './navbar-nologin.component';

describe('NavbarNologinComponent', () => {
  let component: NavbarNologinComponent;
  let fixture: ComponentFixture<NavbarNologinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarNologinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
