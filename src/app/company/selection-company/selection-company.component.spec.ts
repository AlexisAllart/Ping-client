import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCompanyComponent } from './selection-company.component';

describe('SelectionCompanyComponent', () => {
  let component: SelectionCompanyComponent;
  let fixture: ComponentFixture<SelectionCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
