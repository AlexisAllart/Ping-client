import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCompanyComponent } from './navbar-company.component';

describe('NavbarCompanyComponent', () => {
  let component: NavbarCompanyComponent;
  let fixture: ComponentFixture<NavbarCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
