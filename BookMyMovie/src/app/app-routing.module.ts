import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MiddleDivComponent} from './middle-div/middle-div.component';
import {PaymentComponent} from './payment/payment.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ForgotpasswordComponent} from "./forgotpassword/forgotpassword.component";
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { MovieShowSelectComponent } from './movie-show-select/movie-show-select.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';  
import { OrderHistoryComponent } from './order-history/order-history.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import{CustomerReviewTemplateComponent} from "./customer-review-template/customer-review-template.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {ReviewListComponent} from "./review-list/review-list.component";

const routes: Routes = [
  {
    path: 'movie-single/:movieId',
    component: MovieSingleComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'seatselection',
    component: SeatSelectionComponent,
    data: { title: 'Dashboard' }
  },
  {

    path: 'shows',
    component: MovieShowSelectComponent,
    data: { title: 'Dashboard' }
  },
  { 

    path: 'dashboard',
    component: MiddleDivComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { title: 'Payment Form' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login ' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign up' }
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: { title: 'Forgot password' }
  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordComponent,
    data: { title: 'Reset password' }
  },
  {
    path: 'customerreview',
    component: CustomerReviewTemplateComponent,
    data: { title: 'Forgot password' }
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'orderhistory',
    component: OrderHistoryComponent,
    data: { title: 'Order History ' }
  } ,
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: { title: 'User Profile' }
  } ,
  {
    path: 'user-review-list',
    component: ReviewListComponent,
    data: { title: 'User Review List' }
  } ,
   { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
