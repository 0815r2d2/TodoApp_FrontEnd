import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class AddProject {

  name: String;

  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
  }

  async saveProject() {
    let projectData = {
      name: this.name,
    }
    let response = await this.parent.getFetchClientService().saveProject(projectData);
    if (response.status == null) {
      this.parent.getRouter().navigateToRoute("projecttodos", { id: response.id });
    }
  }
}
