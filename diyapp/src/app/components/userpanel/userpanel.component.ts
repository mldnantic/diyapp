import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'userpanel',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.scss',
})
export class UserPanelComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  username: string = '';
  email: string = '';

  ngOnInit(): void {
    const jwt = localStorage.getItem('jwt');
    const decodedJwt = this.decodeJWT(jwt);
    this.username = decodedJwt?.username;
    this.email = decodedJwt?.email;
  }

  private decodeJWT(token: string | null) {
    if (token == null)
      return;
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return {
      username: decoded.username,
      email: decoded.email
    };
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['']);
  }

}
