import { createAction, props } from "@ngrx/store";
import { RegisterUser, User } from "../../models/user";

export const registerUser = createAction(
    'Register User',
    props<{ newUser: RegisterUser }>()
);

export const registerUserSuccess = createAction(
    'Register User Success',
    props<{ user: User }>()
);
