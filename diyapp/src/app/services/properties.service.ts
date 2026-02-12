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

}
