import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForgotPasswordRequest} from "../Models/forgot-password-request";
import {ForgotPasswordService} from "../Services/forgot-password.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  //Initializing forgot password required
  request: ForgotPasswordRequest = new ForgotPasswordRequest();

  public forgotPassword: FormGroup;
  submitted = false;
  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
    this.forgotPassword = new FormGroup({
      'email': new FormControl(null, Validators.required)
    });
  }

  get f() { return this.forgotPassword.controls; }

  //Forgot password api calling method
  sendEmail(){
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    this.request.email = this.forgotPassword.get('email').value;
    this.forgotPasswordService.forgotPassword(this.request)
      .subscribe((result: any) => {
        alert("Please check your email for reset password link")
      }, (error: any) => {
        console.log(error);
      });
  }

}
