import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Item } from "../../models/item";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./item.action";

export interface ItemsState extends EntityState<Item> {
}

const adapter = createEntityAdapter<Item>();

export const initialState: ItemsState = adapter.getInitialState({
});

export const itemsReducer = createReducer(
    initialState,
    on(Actions.loadMostPopularItemsSuccess, (state, { items }) =>
        adapter.setAll(items, state)
    ),
    on(Actions.loadItemsFromCategoriesSuccess, (state, { items }) =>
        adapter.setAll(items, state)
    ),
    on(Actions.loadItemSuccess, (state, { item }) =>
        adapter.addOne(item, state)
    ),
    on(Actions.addItemSuccess, (state, { item }) =>
        adapter.addOne(item, state)
    ),
    on(Actions.uploadItemImageSuccess, (state, { itemId, image }) =>
        adapter.updateOne({
            id: itemId,
            changes: {
                image: image
            }
        }, state)
    ),
    on(Actions.deleteItemSuccess, (state, { itemId }) =>
        adapter.removeOne(itemId, state)
    ),
    on(Actions.updateItemSuccess, (state, { itemId, changes }) =>
        adapter.updateOne({
            id: itemId,
            changes: changes
        }, state)
    )
)
