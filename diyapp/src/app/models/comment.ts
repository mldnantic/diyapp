export interface Comment {
    id: number,
    username: string,
    content: string,
    createdAt: Date,
    itemId: number,
    reported: boolean
}
