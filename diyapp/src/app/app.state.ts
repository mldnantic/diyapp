import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { isDevMode } from "@angular/core";
import { categoriesReducer, CategoriesState } from "./store/category/category.reducer";
import { itemsReducer, ItemsState } from "./store/item/item.reducer";
import { propertiesReducer, PropertiesState } from "./store/property/property.reducer";

export interface AppState {
    categories: CategoriesState;
    properties: PropertiesState;
    items: ItemsState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducer,
    properties: propertiesReducer,
    items: itemsReducer
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];