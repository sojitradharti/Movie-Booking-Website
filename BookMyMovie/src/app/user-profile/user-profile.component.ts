import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../Models/user";
import {UserProfileService} from "../Services/user-profile";
import {CookieService} from "ngx-cookie-service";
import {UserProfileRequest} from "../Models/user-profile-request";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userProfileForm: FormGroup;
  user: User;
  submitted = false;
  request: UserProfileRequest = new UserProfileRequest();

  constructor(private userService: UserProfileService, private cookieService: CookieService) {
    this.user = JSON.parse(this.cookieService.get('UserDetails')).user;
    this.userProfileForm = new FormGroup({
      'firstname': new FormControl({disabled: true, value: this.user.firstname}, Validators.required),
      'lastname': new FormControl({disabled: true, value: this.user.lastname}, Validators.required),
      'email': new FormControl({disabled: true, value: this.user.email}, Validators.required),
      'phoneNo': new FormControl({disabled: false, value: this.user.phoneNo}, Validators.required),
      'username': new FormControl({disabled: false, value: this.user.username}, Validators.required)
    });

  }

  ngOnInit() {

  }

  /*Get all the user profile controls*/
  get f() { return this.userProfileForm.controls; }

  /*Submit user details. Request contains email and phone number*/
  submitUserDetails(){
    this.submitted = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    this.request._id = this.user._id;
    this.request.email = this.userProfileForm.get('email').value;
    this.request.phoneNo = this.userProfileForm.get('phoneNo').value;
    this.userService.updateUserDetails(this.request, JSON.parse(this.cookieService.get('UserDetails')).access_token)
      .subscribe((result: any) => {
        this.user.email = this.userProfileForm.get('email').value;
        this.user.phoneNo  = this.userProfileForm.get('phoneNo').value;
        result = JSON.parse(this.cookieService.get('UserDetails'));
         result.user = this.user;
        /*Store the new values in cookie*/
        this.cookieService.set( 'UserDetails', JSON.stringify(result) );
        alert(result.message);
        if(result.status == 200){
          this.user = result.user;
        }
      }, (error: any) => {
        console.log(error);
      });
  }

}
