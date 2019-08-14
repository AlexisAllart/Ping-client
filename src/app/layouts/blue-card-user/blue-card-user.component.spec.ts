import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueCardUserComponent } from './blue-card-user.component';

describe('BlueCardUserComponent', () => {
  let component: BlueCardUserComponent;
  let fixture: ComponentFixture<BlueCardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueCardUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
