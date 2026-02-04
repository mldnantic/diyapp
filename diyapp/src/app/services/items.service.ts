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

  getAll() {
    return this.httpClient.get<Item[]>(environment.APIURL + "/items");
  }

  addItem( itemName: string, itemPrice: number, categoryId: number): Observable<Item> {
    return this.httpClient.post<Item>(environment.APIURL + "/items", {
      name: itemName,
      price: itemPrice,
      categoryId: categoryId
    });
  }

}
