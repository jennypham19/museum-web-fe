// src/types/user.ts
export interface IUser {
    id: number;
    email?: string;
    fullName: string;
    role: 'admin' | 'employee';
    createdAt?: string;
    updatedAt?: string;
    phoneNumber?: string,
    avatarUrl?:string,
    isActive?: number;
    isChangeType?: number;
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

export interface IRole {
    id: number,
    label: string,
    value: string
}