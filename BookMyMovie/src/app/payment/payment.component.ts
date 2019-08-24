
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Order_Service } from '../Services/order.service';
import { order} from '../Models/order';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../Services/movie.service';
import { TheaterService } from '../Services/theater.service';
import { ShowTimeService } from '../Services/showtime.service';
import {CookieService} from 'ngx-cookie-service';

import { movie } from '../Models/movie';
import { theater } from '../Models/theater';
import { showTime } from '../Models/showtime';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

// import { getMaxListeners } from 'cluster';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  
  cookievalue = 'unknown';
 // orderService: Order_Service;
  theaterService: TheaterService;
  public paymentForm: FormGroup;
  //submitted = false;
  username: string;
  cardnum1:string;
  cardnum2:string;
  cardnum3:string;
  cardnum4:string;
  cvvcode:string;
  model:any =  {};
  form1:any = {};

  movie: movie;
  theater: theater;
  showtime: showTime;
  theatreId: string;
  movieId: string;
  showId: string;
  seatdetails: string;
  noofseats:number;
  totalamt:number;
  ticketprice = 30;
  handlingfees = 7;
  firstname:string;
  lastname:string;
  fullname:string;
  email:string;
  userid:string;
  creationtime:string;
  ccname:string;
  isDownloadEnabled:boolean = false;


 
  @Output() add_pay_invoked = new EventEmitter();

  constructor(public theaterservice: TheaterService,
    public movieservice: MovieService, public  orderService : Order_Service,
  
    private ac: ActivatedRoute,
    private cookieService: CookieService,
    private router:Router) {

   this.theatreId = this.ac.snapshot.params['theatreId'];
   this.movieId = this.ac.snapshot.params['movieId'];
   this.showId = this.ac.snapshot.params['showId'];
   this.showtime = this.ac.snapshot.params['showtime'];
   this.noofseats = this.ac.snapshot.params['totalseat'];
   this.creationtime = this.ac.snapshot.params['date'];
   
   this.seatdetails = this.ac.snapshot.params['seats'];
   //debugger;
   this.cookievalue = this.cookieService.get('UserDetails');
   this.email = JSON.parse(this.cookievalue).user.email;
  
   this.firstname = JSON.parse(this.cookievalue).user.firstname;
   this.lastname = JSON.parse(this.cookievalue).user.lastname;
   this.userid = JSON.parse(this.cookievalue).user._id;
   this.fullname = this.firstname + ' ' + this.lastname;
  
   //get theater-detail
   let theater_d$: Observable<theater> = theaterservice.viewTheaterDetail(this.theatreId);
   theater_d$.subscribe(theater_d => {
     this.theater = theater_d;
  //   console.log(theater_d);
   });

   //get movie-detail
   let movie_d$: Observable<movie> = movieservice.get_single_Movie(this.movieId);
   movie_d$.subscribe(movie_d => {
   //  console.log(movie_d);
     this.movie = movie_d;
   });

    // populating order data - 
    this.model.userid = this.userid;
    this.model.theaterid = this.theatreId;
    this.model.movieid = this.movieId;
    this.model.showtime = this.showtime;
    this.model.seatdetails = this.seatdetails;
   // calculating the total amount of the order
    this.totalamt = (this.noofseats * this.ticketprice) + this.handlingfees;
    this.model.totalamount = this.totalamt;
    this.model.creationtime = this.creationtime;
    this.model.email = this.email;
   
 }
 
 ngOnInit() {
    
}

/*THe below function perform all the input validations and call the 
orderService.createOrder rest api to save the order in the database */
  onClickPlaceOrder() {
   
    if(this.username === "" || this.username === null || this.username === undefined)
    {
      alert("Please provide name.");
      return;
    }
    
    if(this.cardnum1 === "" || this.cardnum1 === null || this.cardnum1 === undefined)
    {
      alert("Please card complete num.");
      return;
    }

    if(this.cardnum2 === "" || this.cardnum2 === null || this.cardnum2 === undefined)
    {
      alert("Please card complete num.");
      return;
    }

    if(this.cardnum3 === "" || this.cardnum3 === null || this.cardnum3 === undefined)
    {
      alert("Please card complete num.");
      return;
    }
    if(this.cardnum4 === "" || this.cardnum4 === null || this.cardnum4 === undefined)
    {
      alert("Please card complete num.");
      return;
    }
  
    if(this.cvvcode === "" || this.cvvcode === null || this.cvvcode === undefined)
    {
      alert("Please card security code.");
      return;
    }
    
    alert("Order is being placed.");
    //console.log(this.model);
    let neworder$: Observable<order> = this.orderService.createOrder(this.model);
    neworder$.subscribe(
      success => { alert("Order placed successfull and  booking details have been sent to your email.")
        this.isDownloadEnabled = true;
     },
      error => {
        console.log(error);
      });
    this.add_pay_invoked.emit();
  }

  downloadAsPDF() {
    html2canvas(document.getElementById('col-md-12')).then(function (canvas) {
      scale: 2;
      dpi: 144;
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 5, 20);
      doc.save('movieBookingSummary.pdf');
    });
  }
}
