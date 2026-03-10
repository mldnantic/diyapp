import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getReportedComments() {
    return this.httpClient.get<Comment[]>(environment.APIURL + "/comments/reported");
  }

  getCommentsForItem(itemId: number) {
    return this.httpClient.get<Comment[]>(environment.APIURL + "/comments/item/" + itemId);
  }

  addComment(userId: number, content: string, itemId: number) {
    return this.httpClient.post<Comment>(environment.APIURL + "/comments", {
      userId: userId,
      content: content,
      itemId: itemId
    });
  }

  reportComment(id: number) {
    return this.httpClient.put<Comment>(environment.APIURL + "/comments/" + id, {});
  }

  unreportComment(id: number) {
    return this.httpClient.put<Comment>(environment.APIURL + "/comments/unreport/" + id, {});
  }

  deleteComment(commentId: number) {
    return this.httpClient.delete(environment.APIURL + "/comments/" + commentId);
  }

}
