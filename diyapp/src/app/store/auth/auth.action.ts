import { createAction, props } from "@ngrx/store";
import { RegisterUser, User } from "../../models/user";

export const registerUser = createAction(
    'Register User',
    props<{ newUser: RegisterUser }>()
);

export const registerUserSuccess = createAction(
    'Register User Success',
);

export const loginUser = createAction(
    'Login User',
    props<{
        username: string,
        password: string
    }>()
);

export const loginUserSuccess = createAction(
    'Login User Success',
);
