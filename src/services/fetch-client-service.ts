import { autoinject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

@autoinject
export class FetchClientService {

  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();

    // this.httpClient.configure(config => {
    //   config
    //     .withDefaults({
    //       headers: {
    //         'Accept': 'application/json',
    //         'X-Requested-With': 'Fetch'
    //       }
    //     });
    // });
  }

  async getAllUsers(): Promise<any> {
    const url = "http://localhost:5000/api/Users";
    let returnData;
    await this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }

  async getAllRoles(): Promise<any> {
    const url = "http://localhost:5000/api/Roles";
    let returnData;
    await this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }

  async registerUser(userdata: any): Promise<any> {
    const url = "http://localhost:5000/api/Users";
    let json = JSON.stringify(userdata);
    let returnValue;
    await this.httpClient.fetch(url, {
      method: 'post',
      body: json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async getUserById(userid: number) {
    const url = "http://localhost:5000/api/Users/" + userid;
    let returnData;
    await this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }

  async updateUserData(userId: number, userData: any) {
    const url = "http://localhost:5000/api/Users/" + userId;
    let json = JSON.stringify(userData);
    let returnValue;
    await this.httpClient.fetch(url, {
      method: 'put',
      body: json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async loginUser(loginData: any) {
    const url = "http://localhost:5000/api/Users/authenticate";
    let returnValue;
    let json = JSON.stringify(loginData);
    await this.httpClient.fetch(url, {
      method: 'post',
      body: json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async getAllProjects(): Promise<any> {
    const url = "http://localhost:5000/api/Projects";
    let returnData;
    await this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }

  async getAllTodosOfProject(projectId: number): Promise<any> {
    const url = "http://localhost:5000/api/Projects/" + projectId + "/assignedTodos";
    let returnData;
    await this.httpClient.fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }

  async getTodoById(userid: number): Promise<any> {
    const url = "http://localhost:5000/api/Todoes/" + userid;
    let returnData;
    await this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }

  async saveTodo(tododata: any): Promise<any> {
    const url = "http://localhost:5000/api/Todoes";
    let json = JSON.stringify(tododata);
    let returnValue;
    await this.httpClient.fetch(url, {
      method: 'post',
      body: json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async updateTodo(tododata: any, todoId: number): Promise<any> {
    const url = "http://localhost:5000/api/Todoes/" + todoId;
    let json = JSON.stringify(tododata);
    let returnValue;
    await this.httpClient.fetch(url, {
      method: 'put',
      body: json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async getAllAssignedTodosOfUser(userid: number): Promise<any> {
    const url = "http://localhost:5000/api/Users/" + userid + "/assignedTodos";
    //let json = JSON.stringify(userid);
    let returnValue;
    await this.httpClient.fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async saveProject(projectData: any) {
    const url = "http://localhost:5000/api/Projects";
    let json = JSON.stringify(projectData);
    let returnValue;
    await this.httpClient.fetch(url, {
      method: 'post',
      body: json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        returnValue = response;
      });
    return returnValue;
  }

  async getProjectById(projectid: number) {
    const url = "http://localhost:5000/api/Projects/" + projectid;
    let returnData;
    await this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        returnData = data;
      });
    return returnData;
  }
}
