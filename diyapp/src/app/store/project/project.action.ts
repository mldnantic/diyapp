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

export const loadProject = createAction(
    'Load Project',
    props<{ projectId: number }>()
);

export const loadProjectSuccess = createAction(
    'Load Project Success',
    props<{ project: Project }>()
);

export const loadItemsOfProject = createAction(
    'Load Items Of Project',
    props<{
        projectId: number
    }>()
);

export const loadItemsOfProjectSuccess = createAction(
    'Load Items Of Project Success',
    props<{ items: ProjectItem[] }>()
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

export const removeItemFromProject = createAction(
    'Remove Item From Project',
    props<{
        itemId: number,
        projectId: number
    }>()
);

export const removeItemFromProjectSuccess = createAction(
    'Remove Item From Project Success',
    props<{
        itemId: number,
        projectId: number
    }>()
);

export const deleteProject = createAction(
    'Delete Project',
    props<{ projectId: number }>()
);

export const deleteProjectSuccess = createAction(
    'Delete Project Success',
    props<{ projectId: number }>()
);
