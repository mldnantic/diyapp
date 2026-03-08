import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ItemsService } from "../../services/items.service";
import * as ItemActions from "./item.action";

@Injectable({
    providedIn: 'root',
})
export class ItemsEffects {

    private action$ = inject(Actions);
    private itemsService = inject(ItemsService);

    loadMostPopularItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.loadMostPopularItems),
            mergeMap( () =>
                this.itemsService.getMostPopularItems().pipe(
                    map((items) => ItemActions.loadMostPopularItemsSuccess({ items })),
                    catchError(() => of({ type: 'load most popular items error' }))
                )
            )
        )
    );

    loadItemsFromCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.loadItemsFromCategories),
            mergeMap(action =>
                this.itemsService.getItemsFromCategories(action.categoryIds).pipe(
                    map((items) => ItemActions.loadItemsFromCategoriesSuccess({ items })),
                    catchError(() => of({ type: 'load items from categories error' }))
                )
            )
        )
    );

    loadItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.loadItem),
            mergeMap(action =>
                this.itemsService.getItem(action.itemId).pipe(
                    map((item) => ItemActions.loadItemSuccess({ item })),
                    catchError(() => of({ type: 'load item error' }))
                )
            )
        )
    );

    addItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.addItem),
            mergeMap(action => {
                return this.itemsService.addItem(
                    action.name,
                    action.price,
                    action.categoryId
                ).pipe(
                    map((item) => ItemActions.addItemSuccess({ item })),
                    catchError(() => of({ type: 'add item error' }))
                )
            }
            )
        )
    );

    uploadItemImage$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.uploadItemImage),
            mergeMap(action => {
                return this.itemsService.uploadImage(action.itemId, action.image).pipe(
                    map((item) => ItemActions.uploadItemImageSuccess({ itemId: item.id, image: item.image })),
                    catchError(() => of({ type: 'upload item image error' }))
                )
            })
        )
    );

    deleteItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.deleteItem),
            mergeMap(action => {
                return this.itemsService.deleteItem(action.itemId).pipe(
                    map(() => ItemActions.deleteItemSuccess({ itemId: action.itemId })),
                    catchError(() => of({ type: 'delete item error' }))
                )
            })
        )
    );

    updateItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(ItemActions.updateItem),
            mergeMap(action => {
                return this.itemsService.updateItem(action.itemId, action.changes).pipe(
                    map(() => ItemActions.updateItemSuccess({ itemId: action.itemId, changes: action.changes })),
                    catchError(() => of({ type: 'update category error' }))
                )
            })
        )
    );
}
