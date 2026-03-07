import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { registerUser } from '../../store/auth/auth.action';

@Component({
  selector: 'app-signup.component',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent {

  email: string = '';
  username: string = '';
  password: string = '';

  hide = signal(true);

  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService) { }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  register() {
    if (this.email == '' || this.username == '' || this.password == '')
      return;
    this.store.dispatch(registerUser({
      newUser: {
        email: this.email,
        username: this.username,
        password: this.password
      }
    }));
    // this.authService.registerUser({
    //   email: this.email,
    //   username: this.username,
    //   password: this.password
    // }).subscribe({
    //   next: (res: User) => {
    //     console.log(res);
    //     console.log('Registration successful, you can proceed to login');
    //   },
    //   error: (err) => {
    //     console.error('REGISTRATION FAILED', err);
    //   }
    // })
  }

  login() {
    if (this.username == '' || this.password == '')
      return;
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('jwt', res.access_token);
        console.log(res.access_token);
        this.router.navigate(['profile']);
      },
      error: (err) => {
        console.error('LOGIN FAILED', err);
      }
    });

  }


}
