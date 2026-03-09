import { createAction, props } from "@ngrx/store";
import { Project, ProjectItem } from "../../models/project";

export const loadProjectsFromUser = createAction(
    'Load Projects From User',
    props<{ userId: number }>()
);

export const loadProjectsFromUserSuccess = createAction(
    'Load Projects From User Success',
    props<{ projects: Project[] }>()
);

export const createProject = createAction(
    'Add Project',
    props<{
        userId: number,
        projectName: string
    }>()
);

export const createProjectSuccess = createAction(
    'Add Project Success',
    props<{ project: Project }>()
);

export const addItemToProject = createAction(
    'Add Item To Project',
    props<{
        itemId: number,
        projectId: number,
        quantity: number
    }>()
);

export const addItemToProjectSuccess = createAction(
    'Add Item To Project Success',
    props<{ projectItem: ProjectItem }>()
);

export const deleteProject = createAction(
    'Delete Project',
    props<{ projectId: number }>()
);

export const deleteProjectSuccess = createAction(
    'Delete Project Success',
    props<{ projectId: number }>()
);
