import { AuthenticationService } from './services/authentication-service';
import { FetchClientService } from './services/fetch-client-service';
import { PLATFORM, autoinject, useShadowDOM } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject
export class App {
  router: Router;
  fetchClientService: FetchClientService;
  authenticationService: AuthenticationService;

  constructor() {
    this.fetchClientService = new FetchClientService();
    this.authenticationService = new AuthenticationService();
  }

  authTitle = ["User Settings", "User Todos", "Add Todo", "Todo", "Projects", "Add Project"];
  nonAuthTitle = ["Register User", "Login User"];

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Title';
    config.map([
      { route: ['', 'home'], name: 'test', nav: true, moduleId: PLATFORM.moduleName('./resources/home/home'), title: 'Home', settings: { data: this } },
      { route: 'registeruser', name: 'registeruser', nav: true, moduleId: PLATFORM.moduleName('./resources/register-user/register-user'), title: 'Register User', settings: { data: this } },
      { route: 'loginuser', name: 'loginuser', nav: true, moduleId: PLATFORM.moduleName('./resources/login-user/login-user'), title: 'Login User', settings: { data: this } },
      // { route: 'usersettings', name: 'usersettings', nav: true, moduleId: PLATFORM.moduleName('./resources/user-settings/user-settings'), title: 'User Settings', settings: { data: this } },
      // { route: 'usertodos', name: 'usertodos', nav: true, moduleId: PLATFORM.moduleName('./resources/show-todos-user/show-todos-user'), title: 'User Todos', settings: { data: this } },
      // { route: 'addtodo', name: 'addtodo', nav: true, moduleId: PLATFORM.moduleName('./resources/add-todo/add-todo'), title: 'Add Todo', settings: { data: this } },
      // { route: 'todosdetail/:id', name: 'tododetail', nav: false, moduleId: PLATFORM.moduleName('./resources/show-todos-details/show-todos-details'), title: 'Todo', settings: { data: this } },
      // { route: 'projects', name: 'projects', nav: true, moduleId: PLATFORM.moduleName('./resources/show-projects/show-projects'), title: 'Projects', settings: { data: this } },
    ]);
    this.router = router;
  }

  getRouter(): Router {
    return this.router;
  }

  setNavigationToAuthUser(authUser: boolean): void {
    if (authUser) {
      //delete non Auth Routes
      for (var i = 0; i < this.nonAuthTitle.length; i++) {
        let index = this.router.navigation.findIndex(r => r.title == this.nonAuthTitle[i]);
        this.router.navigation.splice(index, 1);
      }
      //add auth Routes
      this.router.addRoute({ route: 'usertodos', name: 'usertodos', nav: true, moduleId: PLATFORM.moduleName('./resources/show-todos-user/show-todos-user'), title: 'User Todos', settings: { data: this } });
      this.router.addRoute({ route: 'todosdetail/:id', name: 'tododetail', nav: false, moduleId: PLATFORM.moduleName('./resources/show-todos-details/show-todos-details'), title: 'Todo', settings: { data: this } });
      this.router.addRoute({ route: 'addtodo', name: 'addtodo', nav: true, moduleId: PLATFORM.moduleName('./resources/add-todo/add-todo'), title: 'Add Todo', settings: { data: this } });
      this.router.addRoute({ route: 'usersettings', name: 'usersettings', nav: true, moduleId: PLATFORM.moduleName('./resources/user-settings/user-settings'), title: 'User Settings', settings: { data: this } });
      this.router.addRoute({ route: 'projects', name: 'projects', nav: true, moduleId: PLATFORM.moduleName('./resources/show-projects/show-projects'), title: 'Projects', settings: { data: this } });
      this.router.addRoute({ route: 'addproject', name: 'addproject', nav: true, moduleId: PLATFORM.moduleName('./resources/add-project/add-project'), title: 'Add Project', settings: { data: this } });
      this.router.addRoute({ route: 'projecttodos/:id', name: 'projecttodos', nav: false, moduleId: PLATFORM.moduleName('./resources/show-project-todos/show-project-todos'), title: 'Project Todos', settings: { data: this } });
    } else {
      //delete Auth Routes
      for (var i = 0; i < this.authTitle.length; i++) {
        debugger;
        let index = this.router.navigation.findIndex(r => r.title == this.authTitle[i]);
        this.router.navigation.splice(index, 1);
      }
      //add non auth Routes
      this.router.addRoute({ route: 'registeruser', name: 'registeruser', nav: true, moduleId: PLATFORM.moduleName('./resources/register-user/register-user'), title: 'Register User', settings: { data: this } });
      this.router.addRoute({ route: 'loginuser', name: 'loginuser', nav: true, moduleId: PLATFORM.moduleName('./resources/login-user/login-user'), title: 'Login User', settings: { data: this } });
    }
    this.router.refreshNavigation();
  }

  getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  getFetchClientService(): FetchClientService {
    return this.fetchClientService;
  }

}

