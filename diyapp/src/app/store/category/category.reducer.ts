import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Category } from "../../models/category";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./category.action";


export interface CategoriesState extends EntityState<Category> {
    selectedCategories: number[];
}

const adapter = createEntityAdapter<Category>();

export const initialState: CategoriesState = adapter.getInitialState({
    selectedCategories: [],
});

export const categoriesReducer = createReducer(
    initialState,
    on(Actions.loadCategoriesSuccess, (state, {categories})=> 
        adapter.setAll(categories, state)
    ),
)