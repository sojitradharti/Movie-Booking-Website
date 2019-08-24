import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { review, review_List } from './../Models/review';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class Review_Service {
  reviewDbName: string;
  reviewDbURL: string;
  reviewId: String;
  movieId: string;
  movieReviewUrl: string;

  /**
     * Constructor.
     */
  constructor(private http: HttpClient) {

    this.reviewDbName = 'reviews';
    this.reviewDbURL = `${environment.serverBaseURL}${this.reviewDbName}`;
    this.movieReviewUrl = environment.serverBaseURL + 'movie-reviews'
  }
  // get all reviews
  get_Reviews(): Observable<Array<review>> {
    return this.http.get<Array<review>>(this.reviewDbURL);

  }
  //get single review
  get_single_Review(reviewId: string): Observable<review> {
    this.reviewId = reviewId;
    return this.http.get<review>(`${this.reviewDbURL}/${this.reviewId}`);
  }
 // create review 
  create_Review(review: review_List): Observable<review_List> {
    let newreview: review_List;
    newreview = review ? review : new review_List(review.userid, review.movieid, review.mname, review.date, review.desc);
    return this.http.post<review_List>(`${environment.serverBaseURL}${this.reviewDbName}`, newreview);
  }
  
// get movie specific reviews
  getReviewsForMovie(movieid: string): Observable<Array<review>> {
    return this.http.get<Array<review>>(`${this.movieReviewUrl}/${movieid}`);
  }

  // get user specific reviews
  getReviewsForUser(userId: string): Observable<Array<review>> {
    return this.http.get<Array<review>>(`${environment.serverBaseURL}${this.reviewDbName}/${userId}`);
  }

  //delete review 
  deleteReview(reviewId: string): Observable<review> {
    this.reviewId = reviewId;
    return this.http.delete<review>(`${this.reviewDbURL}/${this.reviewId}`);
  }
}
