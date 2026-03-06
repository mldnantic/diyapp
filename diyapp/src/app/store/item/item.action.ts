import { createAction, props } from "@ngrx/store";
import { Item } from "../../models/item";

export const loadItemsFromCategories = createAction(
    'Load Items From Categories',
    props<{ categoryIds: number[] }>()
);

export const loadItem = createAction(
    'Load Item',
    props<{ itemId: number }>()
);

export const loadItemSuccess = createAction(
    'Load Item Success',
    props<{ item: Item }>()
);

export const loadItemsFromCategoriesSuccess = createAction(
    'Load Items From Categories Success',
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

export const deleteItem = createAction(
    'Delete Item',
    props<{ itemId: number }>()
);

export const deleteItemSuccess = createAction(
    'Delete Item Success',
    props<{ itemId: number }>()
);

export const updateItem = createAction(
    'Update Item',
    props<{
        itemId: number,
        changes: Partial<Item>
    }>()
);

export const updateItemSuccess = createAction(
    'Update Item Success',
    props<{
        itemId: number,
        changes: Partial<Item>
    }>()
);
