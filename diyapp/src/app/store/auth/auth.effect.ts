import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import { catchError, map, merge, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthEffects {

    private action$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    registerUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.registerUser),
            mergeMap(action =>
                this.authService.registerUser(action.newUser).pipe(
                    map(() => AuthActions.registerUserSuccess()),
                    catchError(() => of({ type: 'register user error' }))
                )
            )
        )
    );

    loginUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.loginUser),
            mergeMap(action =>
                this.authService.login({
                    username: action.username,
                    password: action.password
                }).pipe(
                    map((res) => {
                        localStorage.setItem('jwt', res.access_token);
                        this.router.navigate(['profile']);
                        return AuthActions.loginUserSuccess();
                    }),
                    catchError(() => of({ type: 'login user error' }))
                )
            )
        )
    );

    uploadProfilePicture$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.uploadProfilePicture),
            mergeMap(action =>
                this.authService.uploadProfilePicture(action.username, action.profilePicture).pipe(
                    map(() => AuthActions.uploadProfilePictureSuccess()),
                    catchError(() => of({ type: 'upload profile picture error' }))
                )
            )
        )
    );
}
