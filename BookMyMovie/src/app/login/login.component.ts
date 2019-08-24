import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {loginRequest} from '../Models/user';
import {LoginService} from '../Services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../Services/data.service';
import { paymentUrl } from '../Models/paymentUrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  cookievalue = 'unknown';
  request: loginRequest = new loginRequest();
  loginService: LoginService;
  public loginForm: FormGroup;
  submitted = false;
  pUrl :paymentUrl = new paymentUrl();
  constructor(private lg: LoginService, private cookieService: CookieService, private router: Router,private dataservice :DataService) {
    this.loginService = lg;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  get f() { return this.loginForm.controls; }

  /*Authenticate user. This will check if the entered elements are valid. If the elements are valid then login api is called*/
  authenticate() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.request.username = this.loginForm.get('username').value;
    this.request.password = this.loginForm.get('password').value;
    this.loginService.login(this.request)
      .subscribe((result: any) => {
        this.cookieService.set( 'UserDetails', JSON.stringify(result) );
        this.cookievalue = this.cookieService.get('UserDetails');
        alert(result.message);
        this.dataservice.setisDisplayname(`Welcome, ${JSON.parse(this.cookievalue).user.firstname}      ${JSON.parse(this.cookievalue).user.lastname}`);
        this.dataservice.setIsSignup(false);
        this.pUrl = this.dataservice.getpUrl();
        if(this.pUrl == undefined )        {
          this.router.navigate(['/dashboard']);
        }
        else {
         this
           .router.navigate(['/payment', { showId: this.pUrl.showId, movieId: this.pUrl.movieId, theatreId: this.pUrl.theatreId, seats: this.pUrl.seats, totalseat: this.pUrl.seats.length, showtime: this.pUrl.showtime, date: this.pUrl .date }]);
        }
        
    }, (error: any) => {
        console.log(error);
      });
  }

  /*Navigate to forgot password page*/
  forgotPassword(){
    this.router.navigate(['/forgotpassword']);
  }
}
