import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/project';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { createProject, deleteProject, loadProjectsFromUser } from '../../store/project/project.action';
import { AsyncPipe } from '@angular/common';
import { selectProjectList } from '../../store/project/project.selector';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../createdialog/createdialog.component';

@Component({
  selector: 'userpanel',
  imports: [AsyncPipe, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.scss',
})
export class UserPanelComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>, private createProjectDialog: MatDialog) { }

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

    this.store.dispatch(loadProjectsFromUser({ userId: this.userId }));
    this.projects$ = this.store.select(selectProjectList);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['']);
  }

  navToAdminPanel() {
    this.router.navigate(['adminpanel']);
  }

  navToModeratorPanel() {
    this.router.navigate(['moderatorpanel']);
  }

  createProject(): void {
    const dialog = this.createProjectDialog.open(CreateDialogComponent, {
      width: '300px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(createProject({ userId: this.userId, projectName: result }));
      }
    });
  }
  
  deleteProject(id: number) {
    this.store.dispatch(deleteProject({ projectId: id }));
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
