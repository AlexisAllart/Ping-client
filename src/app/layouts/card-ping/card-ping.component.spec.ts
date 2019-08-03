import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPingComponent } from './card-ping.component';

describe('CardPingComponent', () => {
  let component: CardPingComponent;
  let fixture: ComponentFixture<CardPingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
