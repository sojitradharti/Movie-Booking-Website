import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { review, review_List } from '../Models/review';
import { Review_Service } from '../Services/review.service';
import { Observable } from 'rxjs';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-customer-review-template',
  templateUrl: './customer-review-template.component.html',
  styleUrls: ['./customer-review-template.component.scss']
})
export class CustomerReviewTemplateComponent implements OnInit {
  list: Array<review>;
  reviewService: Review_Service;
  model: any = {};
  //using input/output to pass the data to child component to parent component and vice versa
  @Input() parentData: string;
  @Input() movieId: string;
  @Output() add_invoked = new EventEmitter();
  constructor(reviewService: Review_Service, private cookieService: CookieService) {
    this.reviewService = reviewService;

  }
  onClickAddReview() {
    console.log()
    // this.add_invoked.emit();
    //passing the userid to the customer review component
    this.model.userid = JSON.parse(this.cookieService.get('UserDetails')).user._id;
    this.model.movieid = this.movieId;
    let newreview$: Observable<review_List> = this.reviewService.create_Review(this.model);
    newreview$.subscribe(
      success => {
        alert("Review added Successfully!");
        this.add_invoked.emit();
      },
      error => {
      }
    );

  }


  ngOnInit() {
  }

}
