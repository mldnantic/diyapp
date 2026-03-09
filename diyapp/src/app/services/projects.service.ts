import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectItem } from '../models/project';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  createProject(userId: number, projectName: string) {
    return this.httpClient.post<Project>(environment.APIURL + "/projects", {
      userId: userId,
      name: projectName
    });
  }

  addItemToProject(itemId: number, projectId: number, quantity: number) {
    return this.httpClient.post<ProjectItem>(environment.APIURL + "/projects/" + projectId + "/items/" + itemId, {
      itemId: itemId,
      quantity: quantity
    }
    )
  };

  removeItemToProject(projectId: number, itemId: number) {
    return this.httpClient.delete(environment.APIURL + "/projects/" + projectId + "/items/" + itemId);
  };

  getProjectsFromUser(userId: number) {
    return this.httpClient.get<Project[]>(environment.APIURL + "/projects/user/" + userId);
  }

  getProject(id: number) {
    return this.httpClient.get<Project>(environment.APIURL + "/projects/" + id);
  }

  deleteProject(id: number) {
    return this.httpClient.delete(environment.APIURL + "/projects/" + id);
  }

}
