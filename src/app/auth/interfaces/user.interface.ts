export interface UserResponse {
    status:string;
    token:string;
    data:Data;
}

export interface Data { 
    user:User
}

export interface User {
    id: number;
    username: string;
    password?:string;
    lastIpAddress?:string
}