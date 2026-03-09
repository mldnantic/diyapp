import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Project } from "../../models/project";

export const selectProjectsFeature = createSelector(
    (state: AppState) => state.projects,
    (projects) => projects
);

export const selectedProjectIds = createSelector(
    selectProjectsFeature,
    (projects) => projects.ids
);

export const selectProjectList = createSelector(selectProjectsFeature, (projects) =>
    projects.ids
        .map((id) => projects.entities[id])
        .filter((project) => project != null)
        .map((project) => <Project>project)
);
