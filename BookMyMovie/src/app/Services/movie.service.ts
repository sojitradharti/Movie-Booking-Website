import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movie, movieList } from './../Models/movie';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {
  resource: string;
  resourceURL: string;
  idMovie: string;

  constructor(private http: HttpClient) {
    this.resource = 'movies';
    this.resourceURL = `${environment.serverBaseURL}${this.resource}`;
  }
  //this is to get the movies
  get_Movies(): Observable<Array<movie>> {
    return this.http.get<Array<movie>>(this.resourceURL);
    
  }
  //get single movie
  get_single_Movie(movieId:string): Observable<movie> {
    this.idMovie = movieId
    console.log(`${this.resourceURL}/${this.idMovie}`);
    console.log(`${this.resourceURL}/${this.idMovie}`);
    return this.http.get<movie>(`${this.resourceURL}/${this.idMovie}`);
    
  }

}

