import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order} from './../Models/order';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable()
export class Order_Service {

  orderDbName: string;
  orderDbURL: string;
  idURL: string;

  /**
  * Constructor.
  */
  constructor(private http: HttpClient) {
    this.orderDbName = 'orders';
    this.orderDbURL = `${environment.serverBaseURL}${this.orderDbName}`;
  }

//getting user specific orders
 viewUserOrders(_id: string): Observable<Array<order>> {
   this.idURL = `${_id}`;
   return this.http.get<Array<order>>(`${this.orderDbURL}/${this.idURL}`);
 }

   /**
   * Creates new order.
   *
   * @param  {order order: order_list {new order_list object}
   * @return {Observable<order>} {Observable for saved order object}
   */
  createOrder(order: order): Observable<order> {
     let neworder: order;
     neworder = order;
     return this.http.post<order>(`${environment.serverBaseURL}${this.orderDbName}`, neworder);
   }

  //Added by Dharati on 4/21/2019
  
  order_booked_seats(theatreId: string, movieId: string,showtime:string, date: String): Observable<Array<order>> {
   // console.log(`${this.orderDbURL}/${theatreId}/${movieId}/${showtime}/${date}`);
        return this.http.get<Array<order>>(`${this.orderDbURL}/${theatreId}/${movieId}/${showtime}/${date}`);
    
  }


}