export class ProjectDto {
    name: string;
    userId: number;
    items: ProjectItemDto[];
}

export class ProjectItemDto {
    itemId: number;
    quantity: number;
}