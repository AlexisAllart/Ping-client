import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferUserComponent } from './offer-user.component';

describe('OfferUserComponent', () => {
  let component: OfferUserComponent;
  let fixture: ComponentFixture<OfferUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
