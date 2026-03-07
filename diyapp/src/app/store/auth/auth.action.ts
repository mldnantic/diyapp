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

export const loginUser = createAction(
    'Login User',
    props<{ user: User }>()
);

export const loginUserSuccess = createAction(
    'Login User Success',
    props<{ access_token: string }>()
);

export const uploadProfilePicture = createAction(
    'Upload Profile Picture',
    props<{ username: string, profilePicture: File }>()
);

export const uploadProfilePictureSuccess = createAction(
    'Upload Profile Picture Success',
    props<{ user: User }>()
);