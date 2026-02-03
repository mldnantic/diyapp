import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoriesService } from "../../services/categories.service";
import { addCategory, loadCategories, loadCategoriesSuccess } from "./category.action";
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
                this.categoriesService.getAll().pipe(
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
                    map((categories) => loadCategoriesSuccess({ categories })),
                    catchError(() => of({type: 'add category error'}))
                )
            }
            )
        )
    )
}