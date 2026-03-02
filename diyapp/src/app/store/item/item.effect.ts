import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ItemsService } from "../../services/items.service";
import { addItem, addItemSuccess, loadItemsFromCategories, loadItemsFromCategoriesSuccess } from "./item.action";


@Injectable({
    providedIn: 'root',
})
export class ItemsEffects {

    private action$ = inject(Actions);
    private itemsService = inject(ItemsService);

    loadItemsFromCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadItemsFromCategories),
            mergeMap(action =>
                this.itemsService.getItemsFromCategories(action.categoryIds).pipe(
                    map((items) => loadItemsFromCategoriesSuccess({ items })),
                    catchError(() => of({ type: 'load items from categories error' }))
                )
            )
        )
    );

    addCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(addItem),
            mergeMap(action => {
                return this.itemsService.addItem(
                    action.name,
                    action.price,
                    action.categoryId
                ).pipe(
                    map((item) => addItemSuccess({ item })),
                    catchError(() => of({ type: 'add item error' }))
                )
            }
            )
        )
    )
}