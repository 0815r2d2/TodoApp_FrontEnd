import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class LoginUser {

  email: String;
  password: String;
  error: String;

  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
  }

  async login() {
    let loginData={
      email : this.email,
      password: this.password
    }
    let response = await this.parent.getFetchClientService().loginUser(loginData);
    if (response.status == null) {
      this.parent.getAuthenticationService().isLoggedIn = true;
      this.parent.getAuthenticationService().setLoggedInUserId(response.id);
      this.parent.setNavigationToAuthUser(true);
      this.parent.getRouter().navigateToRoute("usertodos");
    } else {
      this.error = "An Error occured. please try again";
    }
  }
}
