import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoriesService } from "../../services/categories.service";
import { addCategory, addCategorySuccess, deleteCategory, deleteCategorySuccess, loadCategories, loadCategoriesSuccess, updateCategory, updateCategorySuccess } from "./category.action";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class CategoriesEffects {

    private action$ = inject(Actions);
    private categoriesService = inject(CategoriesService);

    loadCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadCategories),
            mergeMap(() =>
                this.categoriesService.getCategories().pipe(
                    map((categories) => loadCategoriesSuccess({ categories })),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    addCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(addCategory),
            mergeMap(action => {
                return this.categoriesService.addCategory(action.categoryName).pipe(
                    map((category) => addCategorySuccess({ category })),
                    catchError(() => of({ type: 'add category error' }))
                )
            })
        )
    );

    deleteCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategory),
            mergeMap(action => {
                return this.categoriesService.deleteCategory(action.categoryId).pipe(
                    map(() => deleteCategorySuccess({ categoryId: action.categoryId })),
                    catchError(() => of({ type: 'delete category error' }))
                )
            })
        )
    )

    updateCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategory),
            mergeMap(action => {
                return this.categoriesService.updateCategory(action.categoryId, action.categoryName).pipe(
                    map(() => updateCategorySuccess({ categoryId: action.categoryId, categoryName: action.categoryName })),
                    catchError(() => of({ type: 'update category error' }))
                )
            })
        )
    );
}
