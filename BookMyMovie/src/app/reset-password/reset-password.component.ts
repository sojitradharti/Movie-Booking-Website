import { Component, OnInit } from '@angular/core';
import {ForgotPasswordService} from "../Services/forgot-password.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResetPasswordRequest} from "../Models/forgot-password-request";
import {ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  public resetPassword: FormGroup;
  submitted = false;
  request: ResetPasswordRequest  = new ResetPasswordRequest();

  constructor(private router: Router,private forgotPasswordService: ForgotPasswordService, private activatedroute: ActivatedRoute ) {
    this.token = this.activatedroute.snapshot.params['token'];
    console.log('reset token' + this.token);
  }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    });
  }
  get f() { return this.resetPassword.controls; }

  /*Check validations and call reset password api*/
  submitNewPassword(){
   
   
    this.submitted = true;
    if (this.resetPassword.invalid) {
      return;
    }
    this.request.password = this.resetPassword.get('password').value;
    this.request.token = this.token;
    this.forgotPasswordService.resetPassword(this.request)
      .subscribe((result: any) => {
        alert("Password reset successfully.");
        this.router.navigate(['/dashboard'])
        

      }, (error: any) => {
        console.log(error);
      });
  }

}
