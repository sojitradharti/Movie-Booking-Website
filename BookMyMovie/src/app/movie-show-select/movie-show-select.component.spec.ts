import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowSelectComponent } from './movie-show-select.component';

describe('MovieShowSelectComponent', () => {
  let component: MovieShowSelectComponent;
  let fixture: ComponentFixture<MovieShowSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieShowSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieShowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
