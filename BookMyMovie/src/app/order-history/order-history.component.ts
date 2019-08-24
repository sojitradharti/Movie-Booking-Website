import { Component, OnInit } from '@angular/core';
import { order } from '../Models/order';
import { Order_Service } from '../Services/order.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  list: Array<order>;
  model;
  showtime:string;
  theatername:string;
  moviename:string;
  seatdetails:string;
  totalamount:string;
  bookingtime:string;
  order_d: order;
  cookievalue = 'unknown';
  userid:string;

  constructor(public o_service: Order_Service, private ac: ActivatedRoute,
    private cookieService: CookieService) { 
    //getting userid to get user specific orders
      this.cookievalue = this.cookieService.get('UserDetails');
      this.userid = JSON.parse(this.cookievalue).user._id;
     
    // call to rest api to get user specific orders
    let orders$: Observable<Array<order>> = 
    o_service.viewUserOrders(this.userid);
    orders$.subscribe(orders => {
      this.list = orders;

    });

  }

  ngOnInit() {
  }

  // populating single order details 
  onClickDetail(orderd)
  {

    this.showtime=orderd.showtime;
    this.moviename=orderd.movieRef.movieName;
    this.theatername = orderd.theaterRef.theatreName;
    this.seatdetails = orderd.seatdetails;
    this.totalamount = orderd.totalamount;
    this.bookingtime = orderd.creationtime;

  }
}
