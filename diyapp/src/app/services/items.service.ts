import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  getMostPopularItems() {
    return this.httpClient.get<Item[]>(environment.APIURL + "/items/mostpopular");
  }

  getItemsFromCategories(categoryIds: number[]) {
    const params = new HttpParams().set('categoryIds', categoryIds.join(","));
    return this.httpClient.get<Item[]>(environment.APIURL + "/items", { params });
  }

  getItem(itemId: number) {
    return this.httpClient.get<Item>(environment.APIURL + "/items/" + itemId);
  }

  addItem(itemName: string, itemPrice: number, categoryId: number): Observable<Item> {
    return this.httpClient.post<Item>(environment.APIURL + "/items", {
      name: itemName,
      price: itemPrice,
      categoryId: categoryId
    });
  }

  viewItem(itemId: number) {
    return this.httpClient.put(environment.APIURL + "/items/" + itemId, {});
  }

  uploadImage(itemId: number, file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.httpClient.post<Item>(environment.APIURL + "/items/upload/" + itemId, formData);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.APIURL + "/items/" + itemId);
  }

  updateItem(itemId: number, changes: Partial<Item>): Observable<void> {
    return this.httpClient.put<void>(environment.APIURL + "/items/" + itemId, changes);
  }

}
