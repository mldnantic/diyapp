import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "../../models/user";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./user.action";


export interface UserState extends EntityState<User> {
}

const adapter = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
});

export const userReducer = createReducer(
    initialState,
    on(Actions.registerUserSuccess, (state, { user }) =>
        adapter.addOne(user, state)
    ),
)