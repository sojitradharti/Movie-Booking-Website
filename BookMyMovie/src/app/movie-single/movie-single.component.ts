   
import { Component, OnInit } from '@angular/core';
import { MovieSingle_Service } from '../Services/moviesingle.service';
import { showTime } from '../Models/showtime';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';
import { movie } from '../Models/movie';
import { MovieService } from '../Services/movie.service';
import { Review_Service } from '../Services/review.service';
import { review } from '../Models/review';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: ['./movie-single.component.scss']
})
export class MovieSingleComponent implements OnInit {
  dateModel: NgbDate;
  movie: movie;
  list_showtimes: Array<showTime>;
  selectedShowId: string;
  result: any[];
  movieId: string;
  theatreId: string;
  showtime: string;
  url:String;

  minDate: NgbDate;
  maxDate: NgbDate;
  isOn: boolean = false;
  list: Array<review>;
  public movieName: String;
  public movieIdentifier: string;

  constructor(public moviesingle_service: MovieSingle_Service, public movieservice: MovieService, private ac: ActivatedRoute, private router: Router, private calendar: NgbCalendar, public reviewService: Review_Service) {

    this.movieId = this.ac.snapshot.params['movieId'];
    this.isOn = false;
    //get movie-single
    let movies$: Observable<movie> = movieservice.get_single_Movie(this.movieId);
    movies$.subscribe(movies => {
      this.movie = movies;
      this.movieName = this.movie.movieName;
      this.movieIdentifier = this.movieId;
      this.url = this.movie.movieURL;
      console.log(this.url);
      console.log(this.movie.movieURL);
      
    });

    let showtimes$: Observable<Array<showTime>> = this.moviesingle_service.getshowTimes(this.movieId);
    showtimes$.subscribe(showtimes => {

      {
        console.log(showtimes);
        var groups = new Set(showtimes.map(item => item['theatreRef'].theatreName))
        this.result = [];
        groups.forEach(g =>
          this.result.push({
            name: g,
            values: showtimes.filter(i => i['theatreRef'].theatreName === g)

          }
          ))
      }     
    });

    //get reviews
    this.getReviewList();

  }

  getReviewList() {
    let reviews$: Observable<Array<review>> = this.reviewService.getReviewsForMovie(this.movieId);
    reviews$.subscribe(reviews => {
     
      this.list = reviews;
    });
  }

  selectShowtime(showid, theatreid, showtime) {
    this.selectedShowId = showid;
    this.theatreId = theatreid;
    this.showtime = showtime;
  }
  onClickPostReview() {
    this.isOn = true;
    this.getReviewList();
  }

  ngOnInit() {
    const today = new Date();
    this.maxDate = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate() + 6);
    this.minDate = this.dateModel = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());

  }
  confirm() {

    if (this.selectedShowId == undefined) {
      alert('please select showtime');
      return;
    }
    this.router.navigate(['/seatselection', { showId: this.selectedShowId, movieId: this.movieId, theatreId: this.theatreId, showtime: this.showtime, date: 1 }]);

  }

  changevalue() {
    this.isOn = false;
    this.getReviewList();
  }

}

