import { createReducer, on } from "@ngrx/store";

export interface AuthState {
}

export const initialState: AuthState = {};

export const authReducer = createReducer(
    initialState,
)
