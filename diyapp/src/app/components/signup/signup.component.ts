import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loginUser, registerUser } from '../../store/auth/auth.action';

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

  constructor(private store: Store<AppState>) { }

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
  }

  login() {
    if (this.username == '' || this.password == '')
      return;
    this.store.dispatch(loginUser({
      username: this.username,
      password: this.password
    }
    ));
  }

}