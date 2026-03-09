import { createAction, props } from "@ngrx/store";
import { Project } from "../../models/project";

export const loadProjectsFromUser = createAction(
    'Load Projects From User',
    props<{ userId: number }>()
);

export const loadProjectsFromUserSuccess = createAction(
    'Load Projects From User Success',
    props<{ projects: Project[] }>()
);

export const addProject = createAction(
    'Add Project',
    props<{
        userId: number,
        projectName: string
    }>()
);

export const addProjectSuccess = createAction(
    'Add Project Success',
    props<{ project: Project }>()
);

export const deleteProject = createAction(
    'Delete Project',
    props<{ projectId: number }>()
);

export const deleteProjectSuccess = createAction(
    'Delete Project Success',
    props<{ projectId: number }>()
);
