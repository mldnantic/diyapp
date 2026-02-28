import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Value } from "../../models/value";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./value.action";


export interface ValuesState extends EntityState<Value> {
}

const adapter = createEntityAdapter<Value>();

export const initialState: ValuesState = adapter.getInitialState({
});

export const valuesReducer = createReducer(
    initialState,
    on(Actions.loadValuesSuccess, (state, { values }) =>
        adapter.setAll(values, state)
    ),
    on(Actions.addValueSuccess, (state, { value }) =>
        adapter.addOne(value, state)
    ),
    on(Actions.deleteValueSuccess, (state, { valueId }) =>
        adapter.removeOne(valueId, state)
    ),
    on(Actions.updateValueSuccess, (state, { valueId, value }) =>
        adapter.updateOne({
            id: valueId,
            changes: { value: value }
        }, state)
    ),
)