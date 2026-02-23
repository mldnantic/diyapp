import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map(response => {
        if (response.valid) {
          console.log('Token is valid', response.payload);
          return true;
        } else {
          console.log('Token expired');
          this.router.navigate(['signup']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['signup']);
        return of(false);
      })
    );
  }

}
