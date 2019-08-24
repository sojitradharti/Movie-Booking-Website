import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleDivComponent } from './middle-div.component';

describe('MiddleDivComponent', () => {
  let component: MiddleDivComponent;
  let fixture: ComponentFixture<MiddleDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
