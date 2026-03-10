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

    loadProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.loadProject),
            mergeMap(action =>
                this.projectsService.getProject(action.projectId).pipe(
                    map((project) => ProjectActions.loadProjectSuccess({ project })),
                    catchError(() => of({ type: 'load project error' }))
                )
            )
        )
    );

    loadItemsFromProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.loadItemsOfProject),
            mergeMap(action =>
                this.projectsService.getItemsOfProject(action.projectId).pipe(
                    map((items) => ProjectActions.loadItemsOfProjectSuccess({ items })),
                    catchError(() => of({ type: 'load items from project error' }))
                )
            )
        )
    );

    addItemToProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.addItemToProject),
            mergeMap(action =>
                this.projectsService.addItemToProject(action.itemId, action.projectId, action.quantity).pipe(
                    catchError(() => of({ type: 'add item to project error' }))
                )
            )
        ),
        {
            dispatch: false
        }
    );

    removeItemFromProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.removeItemFromProject),
            mergeMap(action =>
                this.projectsService.removeItemFromProject(action.itemId,action.projectId).pipe(
                    map(() => ProjectActions.removeItemFromProjectSuccess({ itemId: action.itemId, projectId: action.projectId })),
                    catchError(() => of({ type: 'remove item from project error' }))
                )
            )
        )
    );

    createProject$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProjectActions.createProject),
            mergeMap(action =>
                this.projectsService.createProject(action.userId, action.projectName).pipe(
                    map((project) => ProjectActions.createProjectSuccess({ project })),
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