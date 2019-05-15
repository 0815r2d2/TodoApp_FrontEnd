import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class AddTodo {

  users: any[];
  projects: any[];
  title: String;
  description: String;
  toFinish: any;
  selectedClientId: number = null;
  selectedProjectId: number = null;

  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
    this.loadAllUsers();
    this.loadAllProjects();
  }

  private async loadAllUsers() {
    this.users = await this.parent.getFetchClientService().getAllUsers();
  }

  private async loadAllProjects() {
    this.projects = await this.parent.getFetchClientService().getAllProjects();
  }

  async saveTodo() {
    let todoData = {
      title: this.title,
      description: this.description,
      toFinish: this.toFinish,
      finished: false,
      userID: this.selectedClientId,
      projectID: this.selectedProjectId
    }

    let response = await this.parent.getFetchClientService().saveTodo(todoData); 
    if (response.status == null) {
      this.parent.getRouter().navigateToRoute("usertodos");
    }
  }
}
