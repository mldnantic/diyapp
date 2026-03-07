import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoriesService } from "../../services/categories.service";
import * as CategoryActions from "./category.action";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class CategoriesEffects {

    private action$ = inject(Actions);
    private categoriesService = inject(CategoriesService);

    loadCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(CategoryActions.loadCategories),
            mergeMap(() =>
                this.categoriesService.getCategories().pipe(
                    map((categories) => CategoryActions.loadCategoriesSuccess({ categories })),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    addCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(CategoryActions.addCategory),
            mergeMap(action => {
                return this.categoriesService.addCategory(action.categoryName).pipe(
                    map((category) => CategoryActions.addCategorySuccess({ category })),
                    catchError(() => of({ type: 'add category error' }))
                )
            })
        )
    );

    deleteCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(CategoryActions.deleteCategory),
            mergeMap(action => {
                return this.categoriesService.deleteCategory(action.categoryId).pipe(
                    map(() => CategoryActions.deleteCategorySuccess({ categoryId: action.categoryId })),
                    catchError(() => of({ type: 'delete category error' }))
                )
            })
        )
    )

    updateCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(CategoryActions.updateCategory),
            mergeMap(action => {
                return this.categoriesService.updateCategory(action.categoryId, action.categoryName).pipe(
                    map(() => CategoryActions.updateCategorySuccess({ categoryId: action.categoryId, categoryName: action.categoryName })),
                    catchError(() => of({ type: 'update category error' }))
                )
            })
        )
    );
}
