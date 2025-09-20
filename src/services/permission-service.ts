import { HttpResponse } from "@/types/common";
import { IAction, IMenu, IPermission } from "@/types/permisstion";
import HttpClient from "@/utils/HttpClient";
import { FormDataActions } from "@/views/Manage/Permission/Actions";
import { FormDataMenus } from "@/views/Manage/Permission/Menus";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/permissions`;

interface GroupPermissionResquest{
  name: string,
  permissions: IMenu[]
}

export interface GetParams{
    page: number;
    limit: number;
    searchTerm?: string;
}

export interface PaginatedResponse<T>{
    data: T[];
    totalPages: number;
    currentPage: number;
    total: number;
}

interface GroupPermissionRes{
  id: number,
  name: string
}

interface UserPermissionRequest{
  userId: number | string,
  roleGroupId: number
}

export type ActionsResponse = PaginatedResponse<IAction>;
export type MenusResponse = PaginatedResponse<IMenu>;
export type PermissionsResponse = PaginatedResponse<IPermission>;

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

// Cập nhật chức năng
export const updateMenu = (id: number, payload: FormDataMenus ) => {
    return HttpClient.put<any, HttpResponse<IMenu>>(`${prefix}/update-menu/${id}`, payload)
}

// Lấy danh sách chức năng kèm thao tác
export const getAllModules = () => {
    return HttpClient.get<any, HttpResponse<IMenu>>(`${prefix}/menu-with-action`);
}

// Tạo nhóm quyền
export const createRoleGroup = (data: GroupPermissionResquest) => {
  const endpoint = `${prefix}/create-permission-group`;
  return HttpClient.post<any, HttpResponse<GroupPermissionRes>>(endpoint,data)
}

// Lấy danh sách nhóm quyền
export const getPermissions = (params: GetParams) => {
    return HttpClient.get<any, HttpResponse<PermissionsResponse>>(`${prefix}/role-groups`, { params })
}

//Lấy chi tiết nhóm quyền
export const getPermissionWithMenuAction = (id: number) => {
    return HttpClient.get<any, HttpResponse<IPermission>>(`${prefix}/role-group-with-menu-action/${id}`)
}

// Edit nhóm quyền
export const updateRoleGroup = (id: number, data: GroupPermissionResquest) => {
  const endpoint = `${prefix}/update-permission-group/${id}`;
  return HttpClient.put<any, HttpResponse<GroupPermissionRes>>(endpoint,data)
}

// Lấy danh sách nhóm quyền kèm chức năng
export const getRoleGroupsWithMenu = (params: GetParams) => {
    return HttpClient.get<any, HttpResponse<PermissionsResponse>>(`${prefix}/role-groups-with-menu`, { params })
}

// Gán nhóm quyền cho user
export const assignedGroupToUser = (data: UserPermissionRequest) => {
  const endpoint = `${prefix}/assign-group-to-user`;
  return HttpClient.post<any, HttpResponse>(endpoint, data)
}

// Lấy nhóm quyền theo id user
export const getRoleGroupToUser = (id: number) => {
  return HttpClient.get<any, HttpResponse<IPermission>>(`${prefix}/get-assigned-group-to-user/${id}`)
}