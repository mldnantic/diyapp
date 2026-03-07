export interface RegisterUser {
    email: string;
    username: string;
    password: string;
}

export interface LoginUser {
    user: User,
    access_token: string
}

export interface Credentials {
    username: string;
    password: string;
}
export interface User {
    id: number,
    email: string;
    username: string;
    profilePicture: string;
    role: string;
}