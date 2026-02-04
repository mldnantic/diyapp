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
    on(Actions.loadItemsSuccess, (state, {items})=> 
        adapter.setAll(items, state)
    ),
    on(Actions.addItemSuccess, (state, {item})=>
        adapter.addOne(item, state)
    ),
)