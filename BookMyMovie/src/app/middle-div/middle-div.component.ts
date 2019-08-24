import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { movie } from '../Models/movie';
import { MovieService } from '../Services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-middle-div',
  templateUrl: './middle-div.component.html',
  styleUrls: ['./middle-div.component.scss']
})

export class MiddleDivComponent implements OnInit {
  list: Array<movie>;
  searchTerm: string;
  id: string;
  constructor(private activatedroute: ActivatedRoute, public movieservice: MovieService,public router: Router) {
   
    this.id = this.activatedroute.snapshot.params['id'];
    let movies$: Observable<Array<movie>> = movieservice.get_Movies();
    movies$.subscribe(movies => {
      this.list = movies;
    });
  }

    ngOnInit() {
  }
  movieClick(movieId)
  {   
  this.router.navigate(['/movie-single',movieId]);
  }
}
