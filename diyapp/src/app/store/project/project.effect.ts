import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsService } from "../../services/projects.service";
import * as ProjectActions from "./project.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProjectsEffects {

    private action$ = inject(Actions);
    private projectsService = inject(ProjectsService);

    loadProjectsFromUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.loadProjectsFromUser),
            mergeMap(action =>
                this.projectsService.getProjectsFromUser(action.userId).pipe(
                    map((projects) => ProjectActions.loadProjectsFromUserSuccess({ projects })),
                    catchError(() => of({ type: 'load projects from user error' }))
                )
            )
        )
    );

    createProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.addProject),
            mergeMap(action =>
                this.projectsService.createProject(action.userId, action.projectName).pipe(
                    map((project) => ProjectActions.addProjectSuccess({ project })),
                    catchError(() => of({ type: 'create project error' }))
                )
            )
        )
    );

    deleteProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.deleteProject),
            mergeMap(action =>
                this.projectsService.deleteProject(action.projectId).pipe(
                    map(() => ProjectActions.deleteProjectSuccess({ projectId: action.projectId })),
                    catchError(() => of({ type: 'delete project error' }))
                )
            )
        )
    );

}