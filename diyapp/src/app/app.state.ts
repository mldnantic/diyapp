import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { isDevMode } from "@angular/core";
import { categoriesReducer, CategoriesState } from "./store/category/category.reducer";
import { itemsReducer, ItemsState } from "./store/item/item.reducer";
import { propertiesReducer, PropertiesState } from "./store/property/property.reducer";
import { valuesReducer, ValuesState } from "./store/value/value.reducer";

export interface AppState {
    categories: CategoriesState;
    properties: PropertiesState;
    items: ItemsState;
    values: ValuesState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducer,
    properties: propertiesReducer,
    items: itemsReducer,
    values: valuesReducer
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];