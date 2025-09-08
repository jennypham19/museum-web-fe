import { HttpResponse } from "@/types/common";
import { IAction, IMenu } from "@/types/permisstion";
import HttpClient from "@/utils/HttpClient";
import { FormDataActions } from "@/views/Manage/Permission/Actions";
import { FormDataMenus } from "@/views/Manage/Permission/Menus";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/permissions`;

interface GetParams{
    page: number;
    limit: number;
    searchTerm?: string;
}

interface PaginatedResponse<T>{
    actions: T[];
    menus: T[];
    totalPages: number;
    currentPage: number;
    total: number;
}

export type ActionsResponse = PaginatedResponse<IAction>;
export type MenusResponse = PaginatedResponse<IMenu>;

//Lấy danh sách
export const getActions = (params: GetParams) => {
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

//Tạo chức năng
export const createMenu = (payload: FormDataMenus) => {
    return HttpClient.post<FormDataMenus, HttpResponse>(`${prefix}/create-menu`, payload)
}

//Lấy danh sách chức năng
export const getMenus = (params: GetParams) => {
    return HttpClient.get<any, HttpResponse<MenusResponse>>(`${prefix}/menus`, { params })
}

//Lấy chi tiết chức năng
export const getMenu = (id: number) => {
    return HttpClient.get<any, HttpResponse<IMenu>>(`${prefix}/menu/${id}`)
}