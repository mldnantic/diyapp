import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Project } from "../../models/project";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./project.action";

export interface ProjectsState extends EntityState<Project> {
}

const adapter = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
});

export const projectsReducer = createReducer(
    initialState,
    on(Actions.loadProjectsFromUserSuccess, (state, { projects }) =>
        adapter.setAll(projects, state)
    ),
    on(Actions.addProjectSuccess, (state, { project }) =>
        adapter.addOne(project, state)
    ),
    on(Actions.deleteProjectSuccess, (state, { projectId }) =>
        adapter.removeOne(projectId, state)
    ),
)
