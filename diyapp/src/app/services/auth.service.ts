import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterUser, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: RegisterUser) {
    return this.httpClient.post<User>(environment.APIURL + "/users", user);
  }

  login(credentials: any) {
    return this.httpClient.post(environment.APIURL + "/auth/login", credentials);
  }

  uploadProfilePicture(username: string, profilePicture: File) {
    const formData = new FormData();
    formData.append('image', profilePicture);

    return this.httpClient.post<User>(environment.APIURL + "/users/uploadProfilePicture/" + username, formData);
  }

  private getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  validateToken() {
    const token = this.getToken();
    return this.httpClient.post<{ valid: boolean, payload?: any }>(environment.APIURL + "/auth/validate", { token });
  }

}
