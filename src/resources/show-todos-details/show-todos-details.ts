import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class ShowTodosDetails {

  users: any[];
  projects: any[];
  todoId: number;
  parent: any;
  title: String;
  description: String;
  toFinish: any;
  finished: boolean;
  selectedClientId: number;
  selectedProjectId: number;

  preselectedClient: number;
  preselectedProject: number;

  constructor(router: Router, id: number) {
    this.parent = router.routes[1].settings.data;
  }

  async activate(params, config, navInstruction) {
    this.todoId = params.id;
    await this.loadAllUsers();
    await this.loadAllProjects();
    this.setTodoDetails();
  }

  private async  loadAllUsers() {
    this.users = await this.parent.getFetchClientService().getAllUsers();
  }

  private async loadAllProjects() {
    this.projects = await this.parent.getFetchClientService().getAllProjects();
  }

  private async setTodoDetails() {
    let todo = await this.parent.getFetchClientService().getTodoById(this.todoId);
    this.title = todo.title;
    this.description = todo.description;
    this.finished = todo.finished;
    if (todo.toFinish != null) {
      let splittedDate = todo.toFinish.split("T");
      this.toFinish = splittedDate[0];
    }
    
    if (todo.userID != null) {
      this.selectedClientId = todo.userID;
      this.setPreSelectedClient();
    }

    if (todo.projectID != null) {
      this.selectedProjectId = todo.projectID;
      this.setPreSelectedProject();
    }
  }

  private setPreSelectedClient() {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.selectedClientId) {
        this.preselectedClient = i;
      }
    }
  }

  private setPreSelectedProject() {
    for (var i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id == this.selectedProjectId) {
        this.preselectedProject = i;
      }
    }
  }

  async saveTodoChanges() {
    let todoData = {
      title: this.title,
      description: this.description,
      toFinish: this.toFinish,
      finished: this.finished,
      userID: this.selectedClientId,
      projectID: this.selectedProjectId
    }

    let response = await this.parent.getFetchClientService().updateTodo(todoData, this.todoId);
    if (response.status == 200) {
      this.parent.getRouter().navigateToRoute("usertodos");
    }
  }
}
