import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'userpanel',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.scss',
})
export class UserPanelComponent {

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['']);
  }

}
