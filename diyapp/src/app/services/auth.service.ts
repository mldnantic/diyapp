import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: any) {
    return this.httpClient.post(environment.APIURL + "/auth/login", credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  
}
