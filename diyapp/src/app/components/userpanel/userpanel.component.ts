import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/project';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadProjectsFromUser } from '../../store/project/project.action';
import { AsyncPipe } from '@angular/common';
import { selectProjectList, selectProjectsFeature } from '../../store/project/project.selector';

@Component({
  selector: 'userpanel',
  imports: [AsyncPipe, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.scss',
})
export class UserPanelComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  userId: number = 0;
  username: string = '';
  email: string = '';
  role: string = '';

  projects$: Observable<Project[]> = of([]);

  ngOnInit(): void {
    const jwt = localStorage.getItem('jwt');
    const decodedJwt = this.decodeJWT(jwt);
    this.userId = decodedJwt?.id;
    this.username = decodedJwt?.username;
    this.email = decodedJwt?.email;
    this.role = decodedJwt?.role;

    this.store.dispatch(loadProjectsFromUser({userId: this.userId}));
    this.projects$ = this.store.select(selectProjectList);
  }
  
  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['']);
  }

  createProject() {
    
  }

  navToAdminPanel() {
    this.router.navigate(['adminpanel']);
  }

  navToModeratorPanel() {
    this.router.navigate(['moderatorpanel']);
  }

  private decodeJWT(token: string | null) {
    if (token == null)
      return;
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return {
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role
    };
  }

}
