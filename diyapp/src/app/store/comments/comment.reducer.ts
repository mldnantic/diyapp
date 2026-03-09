import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Comment } from "../../models/comment";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./comment.action";
import { Action } from "rxjs/internal/scheduler/Action";

export interface CommentsState extends EntityState<Comment> {
}

const adapter = createEntityAdapter<Comment>();

export const initialState: CommentsState = adapter.getInitialState({
});

export const commentsReducer = createReducer(
    initialState,
    on(Actions.loadCommentsFromItemSuccess, (state, { comments }) =>
        adapter.setAll(comments, state)
    ),
    on(Actions.loadReportedCommentsSuccess, (state, { comments }) =>
        adapter.setAll(comments, state)
    ),
    on(Actions.addCommentSuccess, (state, { comment }) =>
        adapter.addOne(comment, state)
    ),
    on(Actions.unreportCommentSuccess, (state, { commentId }) =>
        adapter.removeOne(commentId, state)
    ),
    on(Actions.deleteCommentSuccess, (state, { commentId }) =>
        adapter.removeOne(commentId, state)
    ),
)
