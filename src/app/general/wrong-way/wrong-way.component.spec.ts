import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongWayComponent } from './wrong-way.component';

describe('WrongWayComponent', () => {
  let component: WrongWayComponent;
  let fixture: ComponentFixture<WrongWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
