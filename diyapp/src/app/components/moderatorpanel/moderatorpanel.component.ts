import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { Comment } from '../../models/comment';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { deleteComment, loadReportedComments, unreportComment } from '../../store/comments/comment.action';
import { selectCommentList } from '../../store/comments/comment.selector';
@Component({
  selector: 'app-moderatorpanel.component',
  imports: [MatCardModule, AsyncPipe, DatePipe, MatButtonModule],
  templateUrl: './moderatorpanel.component.html',
  styleUrl: './moderatorpanel.component.scss',
})
export class ModeratorPanelComponent implements OnInit {

  comments$: Observable<Comment[]> = of([]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadReportedComments());
    this.comments$ = this.store.select(selectCommentList);
  }

  unreportComment(id: number) {
    this.store.dispatch(unreportComment({commentId: id}));
  }

  deleteComment(id: number) {
    this.store.dispatch(deleteComment({commentId: id}));
  }
}
