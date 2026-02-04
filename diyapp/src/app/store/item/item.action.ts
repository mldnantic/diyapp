import { createAction, props } from "@ngrx/store";
import { Item } from "../../models/item";

export const loadItems = createAction('Load Items');

export const loadItem = createAction(
    'Load Item',
    props<{ itemId: string }>()
);

export const loadItemsSuccess = createAction(
    'Load Items Success',
    props<{ items: Item[] }>()
);

export const addItem = createAction(
    'Add Item',
    props<{
        name: string,
        price: number,
        categoryId: number
    }>()
);

export const addItemSuccess = createAction(
    'Add Item Success',
    props<{ item: Item }>()
);