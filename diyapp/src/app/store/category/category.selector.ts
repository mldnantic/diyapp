import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Category } from "../../models/category";


export const selectCategoriesFeature = createSelector(
    (state: AppState) => state.categories,
    (categories) => categories
);

export const selectedCategoryIds = createSelector(
    selectCategoriesFeature,
    (categories) => categories.ids
);

export const selectCategoryList = createSelector(selectCategoriesFeature, (categories) =>
    categories.ids
        .map((id) => categories.entities[id])
        .filter((category) => category != null)
        .map((category) => <Category>category)
);