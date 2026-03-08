import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentsService } from "../../services/comments.service";
import { catchError, map, mergeMap, of } from "rxjs";
import * as CommentActions from "./comment.action";

@Injectable({
    providedIn: 'root',
})
export class CommentsEffects {

    private action$ = inject(Actions);
    private commentsService = inject(CommentsService);

    loadCommentsFromItem$ = createEffect(() =>
        this.action$.pipe(
            ofType(CommentActions.loadCommentsFromItem),
            mergeMap(action =>
                this.commentsService.getCommentsForItem(action.itemId).pipe(
                    map((comments) => CommentActions.loadCommentsFromItemSuccess({ comments })),
                    catchError(() => of({ type: 'load comments from item error' }))
                )
            )
        )
    );

    addComment$ = createEffect(() =>
        this.action$.pipe(
            ofType(CommentActions.addComment),
            mergeMap(action =>
                this.commentsService.addComment(action.userId, action.content, action.itemId).pipe(
                    map((comment) => CommentActions.addCommentSuccess({ comment })),
                    catchError(() => of({ type: 'add comment error' }))
                )
            )
        )
    );
    
}
