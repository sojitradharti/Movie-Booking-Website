import { Component, OnInit } from '@angular/core';
import {Review_Service} from "../Services/review.service";
import {Observable} from "rxjs";
import {review} from "../Models/review";
import {CookieService} from "ngx-cookie-service";
import {User} from "../Models/user";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  list: Array<review>;
  user: User;
  reviewId: string;

  constructor(private reviewService:  Review_Service, private cookieService: CookieService) {
    this.getReviewList();
  }

  ngOnInit() {
  }

  getReviewList(){
    this.user = JSON.parse(this.cookieService.get('UserDetails')).user;
    let reviews$: Observable<Array<review>> = this.reviewService.getReviewsForUser(this.user._id);
    reviews$.subscribe(reviews => {
      this.list = reviews;
    });
  }

  deleteReview(reviewId) {
    this.reviewService.deleteReview(reviewId)
      .subscribe(reviews => {
        this.getReviewList();
      });
  }

}
