import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ItemsService } from "../../services/items.service";
import { addItem, addItemSuccess, loadItems, loadItemsSuccess } from "./item.action";


@Injectable({
    providedIn: 'root',
})
export class ItemsEffects {

    private action$ = inject(Actions);
    private itemsService = inject(ItemsService);

    loadItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadItems),
            mergeMap(() =>
                this.itemsService.getAll().pipe(
                    map((items) => loadItemsSuccess({ items })),
                    catchError(() => of({ type: 'load error' }))
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
                    catchError(() => of({type: 'add item error'}))
                )
            }
            )
        )
    )
}