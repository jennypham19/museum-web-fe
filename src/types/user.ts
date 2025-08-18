// src/types/user.ts
export interface IUser {
    id: number;
    email: string;
    full_name: string;
    role: 'admin' | 'employee';
    createdAt: string;
    updatedAt: string;
    phone_number?: string,
    avatar_url?:string,
    is_active?: number;
    is_change_type?: number;
}