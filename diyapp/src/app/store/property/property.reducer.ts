import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Property } from "../../models/property";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./property.action";

export interface PropertiesState extends EntityState<Property> {
}

const adapter = createEntityAdapter<Property>();

export const initialState: PropertiesState = adapter.getInitialState({
});

export const propertiesReducer = createReducer(
    initialState,
    on(Actions.loadPropertiesSuccess, (state, { properties }) =>
        adapter.setAll(properties, state)
    ),
    on(Actions.addPropertySuccess, (state, { property }) =>
        adapter.addOne(property, state)
    ),
    on(Actions.deletePropertySuccess, (state, { propertyId }) =>
        adapter.removeOne(propertyId, state)
    ),
    on(Actions.updatePropertySuccess, (state, { propertyId, propertyName }) =>
        adapter.updateOne({
            id: propertyId,
            changes: { name: propertyName }
        }, state)
    ),
)