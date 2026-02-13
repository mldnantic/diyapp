import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PropertiesService } from "../../services/properties.service";
import { addProperty, addPropertySuccess, deleteProperty, deletePropertySuccess, loadProperties, loadPropertiesSuccess, updateProperty, updatePropertySuccess } from "./property.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PropertiesEffects {

    private action$ = inject(Actions);
    private propertiesService = inject(PropertiesService);

    loadProperties$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadProperties),
            mergeMap( action =>
                this.propertiesService.getProperties(action.categoryId).pipe(
                    map((properties) => loadPropertiesSuccess({ properties })),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    addProperty$ = createEffect(() =>
        this.action$.pipe(
            ofType(addProperty),
            mergeMap(action => {
                return this.propertiesService.addProperty(action.categoryId, action.propertyName).pipe(
                    map((property) => addPropertySuccess({ property })),
                    catchError(() => of({ type: 'add property error' }))
                )
            })
        )
    );

    deleteProperty$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProperty),
            mergeMap(action => {
                return this.propertiesService.deleteProperty(action.propertyId).pipe(
                    map(() => deletePropertySuccess({ propertyId: action.propertyId })),
                    catchError(() => of({ type: 'delete property error' }))
                )
            })
        )
    )

    updateProperty$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateProperty),
            mergeMap(action => {
                return this.propertiesService.updateProperty(action.propertyId, action.propertyName).pipe(
                    map(() => updatePropertySuccess({ propertyId: action.propertyId, propertyName: action.propertyName })),
                    catchError(() => of({ type: 'update property error' }))
                )
            })
        )
    );
}
