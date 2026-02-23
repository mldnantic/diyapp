import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: any) {
    return this.httpClient.post(environment.APIURL + "/auth/login", credentials);
  }

  private getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  validateToken(): boolean {
    const token = this.getToken();
    if(!token)
      return false;
    return true;
  }

}
