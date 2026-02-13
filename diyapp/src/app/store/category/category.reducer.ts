import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Category } from "../../models/category";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./category.action";


export interface CategoriesState extends EntityState<Category> {
}

const adapter = createEntityAdapter<Category>();

export const initialState: CategoriesState = adapter.getInitialState({
});

export const categoriesReducer = createReducer(
    initialState,
    on(Actions.loadCategoriesSuccess, (state, {categories})=> 
        adapter.setAll(categories, state)
    ),
    on(Actions.addCategorySuccess, (state, {category})=>
        adapter.addOne(category, state)
    ),
    on(Actions.deleteCategorySuccess, (state, {categoryId})=>
        adapter.removeOne(categoryId, state)
    ),
    on(Actions.updateCategorySuccess, (state, {categoryId, categoryName})=>
        adapter.updateOne({
            id: categoryId,
            changes: { name: categoryName}
        }, state)
    ),
)