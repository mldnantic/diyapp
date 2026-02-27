import { createAction, props } from "@ngrx/store";
import { Value } from "../../models/value";

export const loadValues = createAction(
    'Load Values',
    props<{ itemId: number }>()
);

export const loadValuesSuccess = createAction(
    'Load Values Success',
    props<{ values: Value[] }>()
);

export const addValue = createAction(
    'Add Value',
    props<{
        itemId: number,
        propertyId: string
    }>()
);

export const addValueSuccess = createAction(
    'Add Value Success',
    props<{ value: Value }>()
);

export const deleteValue = createAction(
    'Delete Value',
    props<{ valueId: number }>()
);

export const deleteValueSuccess = createAction(
    'Delete Value Success',
    props<{ valueId: number }>()
);

export const updateValue = createAction(
    'Update Value',
    props<{
        valueId: number,
        value: string
    }>()
);

export const updateValueSuccess = createAction(
    'Update Value Success',
    props<{
        valueId: number,
        value: string
    }>()
);