import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {

  constructor(private httpClient: HttpClient) { }

  getProperties(categoryId: number){
    return this.httpClient.get<Property[]>(environment.APIURL + "/properties/" + categoryId);
  }
  
}
