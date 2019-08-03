import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleClearBlueComponent } from './title-clear-blue.component';

describe('TitleClearBlueComponent', () => {
  let component: TitleClearBlueComponent;
  let fixture: ComponentFixture<TitleClearBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleClearBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleClearBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
