import { createAction, props } from "@ngrx/store";
import { Receipt } from "../../models/receipt";

export const loadReceiptsFromUser = createAction(
    'Load Receipts From User',
    props<{ userId: number }>()
);

export const loadReceiptsFromUserSuccess = createAction(
    'Load Receipts From User Success',
    props<{ projects: Receipt[] }>()
);

export const createReceipt = createAction(
    'Create Receipt',
    props<{
        userId: number,
        projectId: number
    }>()
);

export const createReceiptSuccess = createAction(
    'Create Receipt Success',
    props<{ receipt: Receipt }>()
);
