import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import {SignupRequest} from '../Models/signup-request';
import {User} from '../Models/user';
@Injectable()
export class SignUpService{
  signUpUrl: string;
  signUpResourceURL: string;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.signUpUrl = 'signUp';
    this.signUpResourceURL = `${environment.serverBaseURL}${this.signUpUrl}`;
  }

  /**
   * Sign up
   *
   * @param  {SignupRequest} signUpRequest: SignupRequest {signUpRequest with username, password, email, phoneno, firstname, lastname}
   * @return {Observable<User>} {Observable for saved user object}
   */
  signUp(signUpRequest: SignupRequest): Observable<User> {
    return this.http.post<User>(this.signUpResourceURL, signUpRequest);
  }
}
