import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { Comment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-moderatorpanel.component',
  imports: [MatCardModule, AsyncPipe, MatButtonModule],
  templateUrl: './moderatorpanel.component.html',
  styleUrl: './moderatorpanel.component.scss',
})
export class ModeratorPanelComponent implements OnInit {

  comments$: Observable<Comment[]> = of([]);

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.comments$ = this.commentsService.getComments();
  }

}
