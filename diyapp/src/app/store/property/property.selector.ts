import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Property } from "../../models/property";

export const selectPropertiesFeature = createSelector(
    (state: AppState) => state.properties,
    (properties) => properties
);

export const selectedPropertyIds = createSelector(
    selectPropertiesFeature,
    (properties) => properties.ids
);

export const selectPropertyList = createSelector(selectPropertiesFeature, (properties) =>
    properties.ids
        .map((id) => properties.entities[id])
        .filter((property) => property != null)
        .map((property) => <Property>property)
);