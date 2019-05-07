import {RouterConfiguration, Router} from 'aurelia-router';
import { PLATFORM, autoinject } from "aurelia-framework";

@autoinject
export class App {
  
  

  constructor(){}
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Title';
    config.map([
      // { route: 'register-user', name: 'register-user', moduleId:'resources/register-user', title:'Register User' },
      { route: 'about', name: 'home', moduleId:'./resources/about', title:'About' },
      {route:'', name:'home', moduleId:PLATFORM.moduleName('./resources/index'), title:'Home'},
      {route:'registeruser', name:'registeruser', moduleId:PLATFORM.moduleName('./resources/register-user/register-user'), title:'Register User'}
      // { route: '', name: 'home', moduleId:'./resources/index', title:'Home' }
    ]);
  }

}

