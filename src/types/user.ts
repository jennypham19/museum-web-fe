// src/types/user.ts
export interface IUser {
    id: number;
    email: string;
    fullName: string;
    role: 'admin' | 'employee';
    createdAt: string;
    updatedAt: string;
    phone_number?: string,
    avatar_url?:string,
    is_active?: number;
    is_change_type?: number;
}