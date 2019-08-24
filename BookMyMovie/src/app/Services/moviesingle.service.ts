import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order} from './../Models/order';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { showTime } from '../Models/showtime';

@Injectable()
export class MovieSingle_Service 
{
    orderDbName: string;
    orderDbURL: string;
    idURL: string;

    constructor(private http:HttpClient)
    {
        this.orderDbName = 'showtime';
        this.orderDbURL = `${environment.serverBaseURL}${this.orderDbName}`;
    }

    getshowTimes(movieId: string): Observable<Array<showTime>> {     
        console.log(`${this.orderDbURL}/${movieId}`); 
        return this.http.get<Array<showTime>>(`${this.orderDbURL}/${movieId}`);
      }

}