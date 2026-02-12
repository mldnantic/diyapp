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

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(environment.APIURL + "/categories");
  }

  addCategory(categoryName: string): Observable<Category> {
    return this.httpClient.post<Category>(environment.APIURL + "/categories", { name: categoryName });
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.APIURL + "/categories/" + categoryId);
  }

  updateCategory(categoryId: number, categoryName: string): Observable<void> {
    return this.httpClient.put<void>(environment.APIURL + "/categories/" + categoryId, {name: categoryName});
  }

}
