import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class ShowProjectTodos{

  projectId:number;
  todos: any[];
  projectname: String;
  parent:any;

  constructor(router: Router){
    this.parent = router.routes[1].settings.data;
  }

  async activate(params, config, navInstruction){
    this.projectId = params.id;
    await this.getTodosOfProject();
  }

  private async getTodosOfProject(){
    var projectResponse = await this.parent.getFetchClientService().getProjectById(this.projectId);
    if(projectResponse.status == null){
      this.projectname = projectResponse.name;
    }
    var response = await this.parent.getFetchClientService().getAllTodosOfProject(this.projectId);
    if(response.status == null){
      this.todos = response;
    }
  }

  onClickToTodo(id:number){
    this.parent.getRouter().navigateToRoute("tododetail", {id: id});
  }

  onClickAddTodo(){
    this.parent.getRouter().navigateToRoute("addtodo");
  }
}
