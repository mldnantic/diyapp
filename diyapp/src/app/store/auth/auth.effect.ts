import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthEffects {

    private action$ = inject(Actions);
    private authService = inject(AuthService);

    registerUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.registerUser),
            mergeMap(action =>
                this.authService.registerUser(action.newUser).pipe(
                    map((user) => AuthActions.registerUserSuccess({ user })),
                    catchError(() => of({ type: 'register user error' }))
                )
            )
        )
    );

    uploadProfilePicture$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.uploadProfilePicture),
            mergeMap(action =>
                this.authService.uploadProfilePicture(action.username, action.profilePicture).pipe(
                    map((user) => AuthActions.uploadProfilePictureSuccess({ user })),
                    catchError(() => of({ type: 'upload profile picture error' }))
                )
            )
        )
    );
}