import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import {SignupRequest} from '../Models/signup-request';
import {User} from '../Models/user';
import {order} from "../Models/order";
import {UserProfileRequest} from "../Models/user-profile-request";
import { HttpHeaders} from '@angular/common/http';
@Injectable()
export class UserProfileService{
  userProfileUrl: string;
  userProfileResourceURL: string;
  idURL: string;
  updateProfileUrl: string;
  updateUserProfileResourceURL: string;


  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.userProfileUrl = 'users';
    this.userProfileResourceURL = `${environment.serverBaseURL}${this.userProfileUrl}`;
    this.updateProfileUrl = 'user';
    this.updateUserProfileResourceURL = `${environment.serverBaseURL}${this.updateProfileUrl}`;
  }

  /**
   * User profile
   *
   * @param  {_id} string}
   * @return {Observable<User>} {Observable for saved user object}
   */
  getUserDetails(_id: string): Observable<User> {
    this.idURL = `${_id}`;
    return this.http.get<User>(`${this.userProfileUrl}/${this.idURL}`);
  }

  /**
   * User profile
   *
   * @param  {UserProfileRequest} userProfileRequest: UserProfileRequest {userProfileRequest with email, phoneno}
   * @return {Observable<User>} {Observable for saved user object}
   */

  updateUserDetails(userProfileRequest: UserProfileRequest, token: string): Observable<User> {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer '+ token);
    console.log(httpHeaders);
    return this.http.put<User>(this.updateUserProfileResourceURL, userProfileRequest,{
      headers: httpHeaders
    });
  }
}
