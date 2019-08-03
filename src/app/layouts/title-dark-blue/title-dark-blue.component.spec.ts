import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleDarkBlueComponent } from './title-dark-blue.component';

describe('TitleDarkBlueComponent', () => {
  let component: TitleDarkBlueComponent;
  let fixture: ComponentFixture<TitleDarkBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleDarkBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleDarkBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
