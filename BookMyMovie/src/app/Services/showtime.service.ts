import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { showTime} from './../Models/showtime';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ShowTimeService 

{
showtimeDbName: string;
showtimeDbURL: string;
idURL: string;

/**
   * Constructor.
   */
  constructor(private http: HttpClient) 
  {
    this.showtimeDbName = 'showtimes';
    this.showtimeDbURL = `${environment.serverBaseURL}${this.showtimeDbURL}`;
  }



  viewTheaterDetail(_id: string): Observable<showTime> {
    this.idURL = `${_id}`;
    return this.http.get<showTime>(`${this.showtimeDbURL}/${this.idURL}`);
  }

}
