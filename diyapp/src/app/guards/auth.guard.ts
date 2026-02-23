import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    let valid = false;
    
    this.authService.validateToken().subscribe(response => {
      if(response.valid) {
        console.log('Token is valid', response.payload);
        valid = true;
      }
      else {
        console.log('Token expired');
        this.router.navigate(['signup']);
        valid = false;
      }
    });

    return valid;

  }
}
