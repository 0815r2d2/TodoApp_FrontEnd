import { FetchClientService } from './../../services/fetch-client-service';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from "aurelia-framework";
import { Router } from 'aurelia-router';

@autoinject
export class RegisterUser {

  firstname: String;
  lastname: String;
  email: String;
  password: String;
  roles: any[];
  error: any;
  selectedRole: any;

  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
    this.loadRoles();
  }

  private async loadRoles() {
    this.roles = await this.parent.getFetchClientService().getAllRoles();
  }

  async register() {
    let userData = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      password: this.password,
      roleId: this.selectedRole.id
    }

    var response = await this.parent.getFetchClientService().registerUser(userData);
    
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
