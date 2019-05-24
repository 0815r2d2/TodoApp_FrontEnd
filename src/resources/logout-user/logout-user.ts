import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class LogoutUser {

  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
    this.logoutUser();
  }

  logoutUser(){
    this.parent.getAuthenticationService().isLoggedIn = false;
    this.parent.getAuthenticationService().setLoggedInUserId(null);
    this.parent.setNavigationToAuthUser(false);
    this.parent.getRouter().navigateToRoute("home");
  }
}
