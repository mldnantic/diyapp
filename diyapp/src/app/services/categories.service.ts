import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Category[]>(environment.APIURL + "/categories");
  }

}
