import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Project, ProjectItem } from "../../models/project";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./project.action";

export interface ProjectsState extends EntityState<Project> {
    items: ProjectItem[];
}

const adapter = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
    items: [],
});

export const projectsReducer = createReducer(
    initialState,
    on(Actions.loadProjectsFromUserSuccess, (state, { projects }) =>
        adapter.setAll(projects, state)
    ),
    on(Actions.loadProjectSuccess, (state, { project }) =>
        adapter.setOne(project, state)
    ),
    on(Actions.loadItemsOfProjectSuccess, (state, { items }) => ({
        ...state,
        items
    })),
    on(Actions.removeItemFromProjectSuccess, (state, { itemId, projectId }) => ({
        ...state,
        items: state.items.filter(item => {
            item.id !== itemId && item.projectId !== projectId
        })
    })),
    on(Actions.createProjectSuccess, (state, { project }) =>
        adapter.addOne(project, state)
    ),
    on(Actions.deleteProjectSuccess, (state, { projectId }) =>
        adapter.removeOne(projectId, state)
    ),
)
