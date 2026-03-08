import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getComments() {
    return this.httpClient.get<Comment[]>(environment.APIURL + "/comments");
  }

  getCommentsForItem(itemId: number) {
    return this.httpClient.get<Comment[]>(environment.APIURL + "/comments/" + itemId);
  }

  addComment(userId: number, content: string, itemId: number) {
    return this.httpClient.post<Comment>(environment.APIURL + "/comments", {
      userId: userId,
      content: content,
      itemId: itemId
    });
  }

  deleteComment(commentId: string) {
    return this.httpClient.delete(environment.APIURL + "/comments/" + commentId);
  }

}
