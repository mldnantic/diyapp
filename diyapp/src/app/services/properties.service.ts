import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {

  constructor(private httpClient: HttpClient) { }

  getProperties(categoryId: number) {
    return this.httpClient.get<Property[]>(environment.APIURL + "/properties/" + categoryId);
  }

  addProperty(categoryId: number, propertyName: string): Observable<Property> {
    return this.httpClient.post<Property>(environment.APIURL + "/properties", {
      name: propertyName,
      categoryId: categoryId
    });
  }

  deleteProperty(propertyId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.APIURL + "/properties/" + propertyId);
  }

  updateProperty(propertyId: number, propertyName: string): Observable<void> {
    return this.httpClient.put<void>(environment.APIURL + "/properties/" + propertyId, { name: propertyName });
  }
}
