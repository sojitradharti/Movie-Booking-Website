import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewTemplateComponent } from './customer-review-template.component';

describe('CustomerReviewTemplateComponent', () => {
  let component: CustomerReviewTemplateComponent;
  let fixture: ComponentFixture<CustomerReviewTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
