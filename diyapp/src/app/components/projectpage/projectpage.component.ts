import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Project, ProjectItem } from '../../models/project';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { loadItemsOfProject, loadProject } from '../../store/project/project.action';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { selectProjectById, selectProjectItems } from '../../store/project/project.selector';

@Component({
  selector: 'projectpage',
  imports: [MatCardModule, AsyncPipe, MatButtonModule],
  templateUrl: './projectpage.component.html',
  styleUrl: './projectpage.component.scss',
})
export class ProjectPageComponent implements OnInit {

  projectId: number = 0;
  project$: Observable<Project | undefined> = of();
  itemProjects$: Observable<ProjectItem[]> = of([]);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProject({ projectId: this.projectId }));

    this.project$ = this.store.select(selectProjectById(this.projectId)).pipe(
      tap(project => {
        if (!project) {
          console.error("Project doesn't exist!");
        }
        else {
          this.store.dispatch(loadItemsOfProject({ projectId: this.projectId }));
          this.itemProjects$ = this.store.select(selectProjectItems);
        }
      })
    )
  }

  removeItem(itemId: number) {

  }

}
