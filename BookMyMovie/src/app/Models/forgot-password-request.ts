/*Forgot password request model*/
export class ForgotPasswordRequest {
  email: string;
}

/*Reset password request model*/
export class ResetPasswordRequest{
  password: string;
  token: string;
  constructor(){

  }

}
