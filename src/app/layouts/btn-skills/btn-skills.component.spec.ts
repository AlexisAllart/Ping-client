import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSkillsComponent } from './btn-skills.component';

describe('BtnSkillsComponent', () => {
  let component: BtnSkillsComponent;
  let fixture: ComponentFixture<BtnSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
