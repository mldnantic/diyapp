import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { isDevMode } from "@angular/core";
import { categoriesReducer, CategoriesState } from "./store/category/category.reducer";
import { itemsReducer, ItemsState } from "./store/item/item.reducer";

export interface AppState {
    categories: CategoriesState;
    items: ItemsState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducer,
    items: itemsReducer
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];