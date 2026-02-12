import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get<Item[]>(environment.APIURL + "/items");
  }

  addItem(itemName: string, itemPrice: number, categoryId: number): Observable<Item> {
    return this.httpClient.post<Item>(environment.APIURL + "/items", {
      name: itemName,
      price: itemPrice,
      categoryId: categoryId
    });
  }

  deleteItem(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.APIURL + "/items/" + itemId);
  }

  updateItem(itemId: number, itemName: string, itemPrice: string, categoryId: number): Observable<void> {
    return this.httpClient.put<void>(environment.APIURL + "/items/" + itemId, {
      name: itemName,
      price: itemPrice,
      categoryId: categoryId
    });
  }

}
