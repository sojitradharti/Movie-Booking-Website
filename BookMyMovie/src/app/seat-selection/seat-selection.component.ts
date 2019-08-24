import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { order } from '../Models/order';
import { Order_Service } from '../Services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { paymentUrl } from '../Models/paymentUrl';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  ab: String;
  public seats = [];
  model: any = {};
  bookedseats: string;
  list: Array<order>;
  movieId: string;
  theatreId: string;
  showId: string;
  showtime: string;
  date: String;
  uncheck: string;
  cookievalue: string = "unknown";
  amount: Number;
  pUrl: paymentUrl = new paymentUrl();

  @ViewChild("A5", { read: ElementRef }) tref: ElementRef;

  constructor(public router: Router,
    public ac: ActivatedRoute,
    public o_service: Order_Service,
    public cookieservice: CookieService,
    private dataservice: DataService) {

      // fetching parameters from url
    this.showId = this.ac.snapshot.params['showId'];
    this.movieId = this.ac.snapshot.params['movieId'];
    this.theatreId = this.ac.snapshot.params['theatreId'];
    this.showtime = this.ac.snapshot.params['showtime'];
    this.date = this.ac.snapshot.params['date'];


  }

  ngOnInit() {
    //get data for showtime

    let orders$: Observable<Array<order>> = this.o_service.order_booked_seats(this.theatreId, this.movieId, this.showtime, this.date);
  
    orders$.subscribe(orders => {
      this.list = orders;
      this.disableseats();
    });


  }
  //Function for disabling seats
  disableseats() {
    for (let j = 0; j < this.list.length; j++) {
      this.ab = this.list[j].seatdetails;
      var splitted = this.ab.split(',');
      for (let i = 0; i < splitted.length; i++) {
        var a = document.getElementById(`${splitted[i]}`);
        a.setAttribute('disabled', 'disabled');
        a.setAttribute('checked', 'true');
        this.ab = "";
      }
    }
  }

  //check if user has entered data
  addchk(data) {
    if (this.model.Numseats == undefined) {
      alert('Enter Username and number of seats');
      this.uncheck = data;
      return;
    }
    if (this.seats.length.toString() == this.model.Numseats) {
      alert('You can only select ' + this.model.Numseats + ' seats');
      let za = document.getElementById(`${data}`);
      za.setAttribute('checked', 'false');
      return;
    }
    this.seats.push(data);
    this.amount = (Number(this.amount)) + (Number(20));
    this.model.seats = this.seats.toString();
    var a = document.getElementById(`${data}`);
    a.style.setProperty('border', '3px solid #ff9800');
  }

  //function for payment after seat selection
  confirmandpay() {

    this.cookievalue = this.cookieservice.get('UserDetails');
    if (this.cookievalue == '') {
      this.pUrl.showId = this.showId;
      this.pUrl.movieId = this.movieId;
      this.pUrl.theatreId = this.theatreId;
      this.pUrl.seats = this.seats;
      this.pUrl.totalseat = this.seats.length;
      this.pUrl.showtime = this.showtime;
      this.pUrl.date = this.date;
      this.dataservice.setpUrl(this.pUrl);

      this.router.navigate(['/login']);
    }
    else {

      this.router.navigate(['/payment', { showId: this.showId, movieId: this.movieId, theatreId: this.theatreId, seats: this.seats, totalseat: this.seats.length, showtime: this.showtime, date: this.date }]);
    }
    
  }




}
