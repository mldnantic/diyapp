import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Value } from "../../models/value";

export const selectValuesFeature = createSelector(
    (state: AppState) => state.values,
    (values) => values
);

export const selectedCategoryIds = createSelector(
    selectValuesFeature,
    (values) => values.ids
);

export const selectValueList = createSelector(selectValuesFeature, (values) =>
    values.ids
        .map((id) => values.entities[id])
        .filter((value) => value != null)
        .map((value) => <Value>value)
);
