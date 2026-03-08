import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.action";
import { catchError, map, merge, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class AuthEffects {

    private action$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    registerUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.registerUser),
            mergeMap(action =>
                this.authService.registerUser(action.newUser).pipe(
                    map(() => {
                        this.snackBar.open('Registration successful!', 'Close', {
                            duration: 3000,
                        });
                        return AuthActions.registerUserSuccess();
                    }),
                    catchError(() => {
                        this.snackBar.open('Registration failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: 'register user error' });
                    })
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
                        this.snackBar.open('Login successful!', 'Close', {
                            duration: 3000,
                        });
                        return AuthActions.loginUserSuccess();
                    }),
                    catchError(() => {
                        this.snackBar.open('Login failed!', 'Close', {
                            duration: 3000,
                        });
                        return of({ type: 'login user error' });
                    })
                )
            )
        )
    );
}
