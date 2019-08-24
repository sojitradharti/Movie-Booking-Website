import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { theater} from './../Models/theater';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
//import { formatDate } from '@angular/common';

@Injectable()
export class TheaterService 

{
theaterDbName: string;
theaterDbURL: string;
idURL: string;

/**
   * Constructor.
   */
  constructor(private http: HttpClient) 
  {
    this.theaterDbName = 'theatres';
    this.theaterDbURL = `${environment.serverBaseURL}${this.theaterDbName}`;
  }

  //get theater details based on the theater id 

  viewTheaterDetail(_id: string): Observable<theater> {
    this.idURL = `${_id}`;
    return this.http.get<theater>(`${this.theaterDbURL}/${this.idURL}`);
  }

}