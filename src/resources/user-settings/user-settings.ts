import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class UserSettings {
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  userId: number;
  parent: any;
  error: String;
  user:any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
    this.getUserData();
  }

  private async getUserData() {
    this.userId = this.parent.getAuthenticationService().getLoggedInUserId();
    this.user = await this.parent.getFetchClientService().getUserById(this.userId);

    this.firstname = this.user.firstName;
    this.lastname = this.user.lastName;
    this.email = this.user.email;
    this.password = this.user.password;
  }

  async saveUserData() {
    let userData = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      password: this.password,
      roleID: this.user.roleID
    }

    let response = await this.parent.getFetchClientService().updateUserData(this.userId, userData);
    if (response.status == 200) {
      this.parent.getRouter().navigateToRoute("usertodos");
    } else {
      this.error = "An Error occured. please try again";
    }
  }
}
