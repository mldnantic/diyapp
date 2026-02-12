import { createAction, props } from "@ngrx/store";
import { Category } from "../../models/category";


export const loadCategories = createAction('Load Categories');

export const loadCategoriesSuccess = createAction(
    'Load Categories Success',
    props<{ categories: Category[] }>()
);

export const addCategory = createAction(
    'Add Category',
    props<{ categoryName: string }>()
);

export const addCategorySuccess = createAction(
    'Add Category Success',
    props<{ category: Category }>()
);

export const deleteCategory = createAction(
    'Delete Category',
    props<{ categoryId: number }>()
);

export const deleteCategorySuccess = createAction(
    'Delete Category Success',
    props<{ categoryId: number }>()
);
