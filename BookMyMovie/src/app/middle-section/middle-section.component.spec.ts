import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleSectionComponent } from './middle-section.component';

describe('MiddleSectionComponent', () => {
  let component: MiddleSectionComponent;
  let fixture: ComponentFixture<MiddleSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
