import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "../../models/user";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./auth.action";

export interface AuthState extends EntityState<User> {
}

const adapter = createEntityAdapter<User>();

export const initialState: AuthState = adapter.getInitialState({
});

export const authReducer = createReducer(
    initialState,
    on(Actions.registerUserSuccess, (state, { user }) =>
        adapter.addOne(user, state)
    ),
    // on(Actions.loginUserSuccess, (state, { access_token }) =>
    //     adapter.setOne(access_token, state)
    // ),
    on(Actions.uploadProfilePictureSuccess, (state, { user }) =>
        adapter.setOne(user, state)
    ),
)
