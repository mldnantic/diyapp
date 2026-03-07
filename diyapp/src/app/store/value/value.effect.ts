import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as ValueActions from "./value.action";
import { ValuesService } from "../../services/values.service";

@Injectable({
    providedIn: 'root',
})
export class ValuesEffects {

    private action$ = inject(Actions);
    private categoriesService = inject(ValuesService);

    loadValues$ = createEffect(() =>
        this.action$.pipe(
            ofType(ValueActions.loadValues),
            mergeMap(action =>
                this.categoriesService.getValuesOfItem(action.itemId).pipe(
                    map((values) => ValueActions.loadValuesSuccess({ values })),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    addValue$ = createEffect(() =>
        this.action$.pipe(
            ofType(ValueActions.addValue),
            mergeMap(action => {
                return this.categoriesService.addValue(action.value, action.itemId, action.propertyId).pipe(
                    map((value) => ValueActions.addValueSuccess({ value })),
                    catchError(() => of({ type: 'add value error' }))
                )
            })
        )
    );

    deleteValue$ = createEffect(() =>
        this.action$.pipe(
            ofType(ValueActions.deleteValue),
            mergeMap(action => {
                return this.categoriesService.deleteValue(action.valueId).pipe(
                    map(() => ValueActions.deleteValueSuccess({ valueId: action.valueId })),
                    catchError(() => of({ type: 'delete value error' }))
                )
            })
        )
    )

    updateValue$ = createEffect(() =>
        this.action$.pipe(
            ofType(ValueActions.updateValue),
            mergeMap(action => {
                return this.categoriesService.updateValue(action.valueId, action.value).pipe(
                    map(() => ValueActions.updateValueSuccess({ valueId: action.valueId, value: action.value })),
                    catchError(() => of({ type: 'update value error' }))
                )
            })
        )
    );
}
