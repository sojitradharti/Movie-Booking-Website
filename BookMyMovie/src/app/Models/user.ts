/*User model*/
export class User {
  _id: string;
  firstname: string;
  lastname: string;
  phoneNo: string;
  email: string;
  access_token: string;
  username: string;

}

/*Login request model*/
export class loginRequest {
  password: string;
  username: string;
}
