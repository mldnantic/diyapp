import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { User } from "../../models/user";

export const selectUserFeature = createSelector(
    (state: AppState) => state.user,
    (user) => user
);

export const selectedUserId = createSelector(
    selectUserFeature,
    (user) => user.ids
);

export const selectUser = createSelector(selectUserFeature, (user) =>
    user.ids
        .map((id) => user.entities[id])
        .filter((u) => u != null)
        .map((usr) => <User>usr)
);