import { createAction, props } from "@ngrx/store";
import { Comment } from "../../models/comment";

export const loadCommentsFromItem = createAction(
    'Load Comments From Item',
    props<{ itemId: number }>()
);

export const loadCommentsFromItemSuccess = createAction(
    'Load Comments From Item Success',
    props<{ comments: Comment[] }>()
);

export const loadReportedComments = createAction(
    'Load Reported Comments'
);

export const loadReportedCommentsSuccess = createAction(
    'Load Reported Comments Success',
    props<{ comments: Comment[] }>()
);

export const addComment = createAction(
    'Add Comment',
    props<{
        userId: number,
        content: string,
        itemId: number
    }>()
);

export const addCommentSuccess = createAction(
    'Add Comment Success',
    props<{ comment: Comment }>()
);