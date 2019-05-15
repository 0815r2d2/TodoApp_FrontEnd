import { autoinject } from "aurelia-framework";

@autoinject
export class AuthenticationService {

  isLoggedIn: boolean = false;
  loggedInUserId: number;

  constructor() {

  }

  setLoggedInUserId(id: number): void {
    this.loggedInUserId = id;
  }

  logoutUser(): void {
    this.isLoggedIn = false;
    this.loggedInUserId = null;
  }

  getLoggedInUserId():number{
    return this.loggedInUserId;
  }
}
