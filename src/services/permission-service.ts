import { HttpResponse } from "@/types/common";
import { IAction } from "@/types/permisstion";
import HttpClient from "@/utils/HttpClient";
import { FormDataActions } from "@/views/Manage/Permission/Actions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/permissions`;

interface GetActionsParams{
    page: number;
    limit: number;
    searchTerm?: string;
}

interface PaginatedResponse<T>{
    actions: T[];
    totalPages: number;
    currentPage: number;
    totalActions: number;
}

export type ActionsResponse = PaginatedResponse<IAction>;

//Lấy danh sách
export const getActions = (params: GetActionsParams) => {
    return HttpClient.get<any, HttpResponse<ActionsResponse>>(`${prefix}/actions`, { params })
}

// Thêm mới
export const createAction = (payload: FormDataActions) => {
    return HttpClient.post<FormDataActions, HttpResponse>(`${prefix}/create-action`, payload)
}

// Cập nhật
export const updateAction = (id: number, payload: { name: string} ) => {
    return HttpClient.put<any, HttpResponse<IAction>>(`${prefix}/update-action/${id}`, payload)
}