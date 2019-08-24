import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupRequest} from '../Models/signup-request';
import {SignUpService} from '../Services/sign-up.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {paymentUrl} from "../Models/paymentUrl";
import {DataService} from "../Services/data.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;
  submitted = false;
  request: SignupRequest = new SignupRequest();
  pUrl :paymentUrl = new paymentUrl();
  constructor(private  signUpService: SignUpService, private cookieService: CookieService, private router: Router, private dataservice :DataService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phoneNo': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)

    });
  }

  /*Get all the sign up controls*/
  get f() { return this.signUpForm.controls; }

  /*Sign up button action. Check validations and call signup api*/
  signUp(){
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.request.username = this.signUpForm.get('username').value;
    this.request.password = this.signUpForm.get('password').value;
    this.request.email = this.signUpForm.get('email').value;
    this.request.firstname = this.signUpForm.get('firstname').value;
    this.request.phoneNo = this.signUpForm.get('phoneNo').value;
    this.request.lastname = this.signUpForm.get('lastname').value;
    this.signUpService.signUp(this.request)
      .subscribe((result: any) => {
        this.cookieService.set( 'UserDetails', JSON.stringify(result) );
        alert(result.message);
        /*Navigate to the correct page according to payment url value*/
        this.pUrl = this.dataservice.getpUrl();
        if(this.pUrl == undefined) {
          this.router.navigate(['/login']);
        }
        else {
          this.router.navigate(['/login']);
         // this.router.navigate(['/payment', { showId: this.pUrl.showId, movieId: this.pUrl.movieId, theatreId: this.pUrl.theatreId, seats: this.pUrl.seats, totalseat: this.pUrl.seats.length, showtime: this.pUrl.showtime, date: this.pUrl .date }]);
        }
      
      }, (error: any) => {
        console.log(error);
      });
  }
}
