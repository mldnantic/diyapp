import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Comment } from "../../models/comment";

export const selectCommentsFeature = createSelector(
    (state: AppState) => state.comments,
    (comments) => comments
);

export const selectedCommentIds = createSelector(
    selectCommentsFeature,
    (comments) => comments.ids
);

export const selectCommentList = createSelector(selectCommentsFeature, (comments) =>
    comments.ids
        .map((id) => comments.entities[id])
        .filter((comment) => comment != null)
        .map((comment) => <Comment>comment)
);
