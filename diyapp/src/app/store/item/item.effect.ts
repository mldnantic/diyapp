import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ItemsService } from "../../services/items.service";
import { addItem, addItemSuccess, deleteItem, deleteItemSuccess, loadItemsFromCategories, loadItemsFromCategoriesSuccess, updateItem, updateItemSuccess } from "./item.action";


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

    addItem$ = createEffect(() =>
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

    deleteItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteItem),
            mergeMap(action => {
                return this.itemsService.deleteItem(action.itemId).pipe(
                    map(() => deleteItemSuccess({ itemId: action.itemId })),
                    catchError(() => of({ type: 'delete item error' }))
                )
            })
        )
    )

    updateItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateItem),
            mergeMap(action => {
                return this.itemsService.updateItem(action.itemId, action.changes).pipe(
                    map(() => updateItemSuccess({ itemId: action.itemId, changes: action.changes })),
                    catchError(() => of({ type: 'update category error' }))
                )
            })
        )
    );
}
