import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: RegisterUser) {
    return this.httpClient.post<User>(environment.APIURL + "/users", user);
  }
  
}
