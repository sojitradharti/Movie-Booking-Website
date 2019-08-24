import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import {loginRequest, User} from "../Models/user";
@Injectable()
export class LoginService{
  loginUrl: string;
  loginResourceURL: string;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.loginUrl = 'login';
    this.loginResourceURL = `${environment.serverBaseURL}${this.loginUrl}`;
  }

  /**
   * User login
   *
   * @param  {User} user: User {user with username and password}
   * @return {Observable<User>} {Observable for saved user object}
   */
  login(user: loginRequest): Observable<User> {
    return this.http.post<User>(this.loginResourceURL, user);
  }
}
