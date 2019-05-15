import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class ShowTodosUser {

  todos: any[];
  parent: any;

  constructor(router: Router) {
    this.parent = router.routes[1].settings.data;
    this.getAllTodos();
  }

  private async getAllTodos() {
    var userId = this.parent.getAuthenticationService().getLoggedInUserId();
    var response = await this.parent.getFetchClientService().getAllAssignedTodosOfUser(userId);
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
