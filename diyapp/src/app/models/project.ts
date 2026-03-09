export interface Project {
    id: number,
    name: string,
    userId: number
}

export interface ProjectItem {
    id: number,
    projectId: number,
    itemId: number,
    quantity: number
}