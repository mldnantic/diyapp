import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {

    this.authService.validateToken().subscribe(response => {
      if(response.valid) {
        console.log('Token is valid', response.payload);
        return true;
      }
      else {
        console.log('Token expired');
        return false;
      }
    })

    if (!this.authService.validateToken()) {
      this.router.navigate(['signup']);
      return false;
    }

    return true;
  }
}
