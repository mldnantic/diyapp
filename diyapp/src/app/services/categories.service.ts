import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Category[]>(environment.APIURL + "/categories");
  }

  addCategory(categoryName: string): Observable<Category> {
    return this.httpClient.post<Category>(environment.APIURL + "/categories", { name: categoryName });
  }

}
