import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { isDevMode } from "@angular/core";
import { categoriesReducer, CategoriesState } from "./store/category/category.reducer";

export interface AppState {
    categories: CategoriesState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];