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
          console.log('Token expired');
          this.router.navigate(['signup']);
          return false;
        }

        if (!roles || roles.length == 0) {
          console.log('Token is valid', response.payload);
          return true;
        }

        const userRole = response.payload.role;

        if (roles.includes(userRole)) {
          console.log('Access Granted, user has required role', response.payload);
          return true;
        } else {
          console.log(`Access Denied! Required roles: ${roles} but user has ${userRole}`);
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
