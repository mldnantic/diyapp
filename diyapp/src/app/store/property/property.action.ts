import { createAction, props } from "@ngrx/store";
import { Property } from "../../models/property";

export const loadProperties = createAction(
    'Load Properties',
    props<{ categoryId: number }>()
);

export const loadPropertiesSuccess = createAction(
    'Load Properties Success',
    props<{ properties: Property[] }>()
);

export const addProperty = createAction(
    'Add Property',
    props<{
        categoryId: number, 
        propertyName: string
    }>()
);

export const addPropertySuccess = createAction(
    'Add Property Success',
    props<{ property: Property }>()
);

export const deleteProperty = createAction(
    'Delete Property',
    props<{ propertyId: number }>()
);

export const deletePropertySuccess = createAction(
    'Delete Property Success',
    props<{ propertyId: number }>()
);

export const updateProperty = createAction(
    'Update Property',
    props<{
        propertyId: number,
        propertyName: string
    }>()
);

export const updatePropertySuccess = createAction(
    'Update Property Success',
    props<{
        propertyId: number,
        propertyName: string
    }>()
);
