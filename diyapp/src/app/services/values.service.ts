import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Value } from '../models/value';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValuesService {

  constructor(private httpClient: HttpClient) { }

  getValuesOfItem(itemId: number): Observable<Value[]> {
    return this.httpClient.get<Value[]>(environment.APIURL + "/values/item/" + itemId);
  }

  addValue(value: string, itemId: number, propertyId: number): Observable<Value> {
    return this.httpClient.post<Value>(environment.APIURL + "/values", {
      value: value,
      itemId: itemId,
      propertyId: propertyId
    });
  }

  deleteValue(valueId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.APIURL + "/values/" + valueId);
  }

  updateValue(valueId: number, value: string): Observable<void> {
    return this.httpClient.put<void>(environment.APIURL + "/values/" + valueId, { value: value });
  }
}
