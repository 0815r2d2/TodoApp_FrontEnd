import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class ShowProjects {

  projects: any[];
  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
    this.getAllProjects();
  }

  private async getAllProjects() {
    this.projects = await this.parent.getFetchClientService().getAllProjects();
  }

  onClickToProject(id: any): void {
    this.parent.getRouter().navigateToRoute("projecttodos", { id: id });
  }

  onClickAddProject() {
    this.parent.getRouter().navigateToRoute("addproject");
  }
}
