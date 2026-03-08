import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    
    const roles = route.data['roles'] as Array<string> | undefined;

    return this.authService.validateToken().pipe(
      map(response => {

        if (!response.valid) {
          this.router.navigate(['signup']);
          return false;
        }

        if (!roles || roles.length == 0) {
          return true;
        }

        const userRole = response.payload.role;

        if (roles.includes(userRole)) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
