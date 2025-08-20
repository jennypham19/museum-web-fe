// src/types/user.ts
export interface IUser {
    id: number;
    email?: string;
    full_name: string;
    role: 'admin' | 'employee';
    createdAt?: string;
    updatedAt?: string;
    phone_number?: string,
    avatar_url?:string,
    is_active?: number;
    is_change_type?: number;
    code?: string;
    permission?: string;
}

export interface IMember {
    id: number;
    full_name: string,
    email?: string,
    phone?: string,
    startedDate?: string,
    expiredData?: string,
    member?: string,
    code?: string
}