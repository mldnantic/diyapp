import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
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
