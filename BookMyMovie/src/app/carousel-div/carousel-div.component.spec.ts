import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTrackComponent } from './slider-track.component';

describe('SliderTrackComponent', () => {
  let component: SliderTrackComponent;
  let fixture: ComponentFixture<SliderTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
