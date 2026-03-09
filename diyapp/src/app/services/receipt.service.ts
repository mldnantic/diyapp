import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {

  constructor(private httpClient: HttpClient) { }

  getReceiptsOfUser(userId: number) {
    return this.httpClient.get<Receipt[]>(environment.APIURL + "/receipts/user/" + userId);
  }

  createReceipt(userId: number, projectId: number) {
    return this.httpClient.post<Receipt>(environment.APIURL + "/receipts", {
      userId: userId,
      projectId: projectId
    });
  }
}
