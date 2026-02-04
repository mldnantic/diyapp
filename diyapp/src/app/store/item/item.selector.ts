import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Item } from "../../models/item";

export const selectItemsFeature = createSelector(
    (state: AppState) => state.items,
    (items) => items
);

export const selectedItemIds = createSelector(
    selectItemsFeature,
    (items) => items.ids
);

export const selectItemList = createSelector(selectItemsFeature, (items) =>
    items.ids
        .map((id) => items.entities[id])
        .filter((item) => item != null)
        .map((item) => <Item>item)
);