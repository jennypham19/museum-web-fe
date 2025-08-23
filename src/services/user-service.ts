import type { HttpResponse } from '@/types/common';
import { IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

interface GetUsersParams {
  page: number;
  limit: number;
  role: string
  status?: number | string,
  searchTerm?: string,
}

interface PaginatedResponse<T> {
    users: T[];
    totalPages: number;
    currentPage: number;
    totalUsers: number;
}

export type UsersResponse = PaginatedResponse<IUser>;

export interface UserPayload {
  is_active: number
}

export const getCurrentUser = () => {
  return HttpClient.get<HttpResponse<IUser>>(`${prefix}/me`);
};

export const uploadEmployeeImage = (file: File, type: string): Promise<HttpResponse<{ imageUrl: string }>> => {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('image', file);
  
  return HttpClient.post(
    `${prefix}/upload-image`, 
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const createUser = (payload: { email: string; full_name: string; password: string, avatar_url?: string, phone_number?: string }) => {
    return HttpClient.post(`${prefix}/create-user`, payload);
};

// export const getUsers = (params: GetUsersParams) => {
//   return HttpClient.get<any, HttpResponse<UsersResponse>>(`${prefix}/get-all`, { params });
// };

export const getUsers = async(
  page: number,
  limit: number,
  role: string,
  status?: number | string,
  searchTerm?: string
): Promise<UsersResponse> => {
  let url = `${prefix}/get-all`;
  const params: Record<string, any> = {
        page: page,
        limit: limit,
        role: role
  };

  if(searchTerm && searchTerm.trim()){
    params.searchTerm = searchTerm
  }

  if (status !== undefined && status !== 'all' && status !== null) {
    params.status = status;
  }

  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: UsersResponse;
  }>(url, { params });
  if(response.data && response.success && response.data){
    return response.data;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
};

export const getUser = (id: number) => {
  return HttpClient.get<any, HttpResponse<IUser>>(`${prefix}/get-detail-user/${id}`);
};

export const unactiveUser = async (
  id: string | number,
  payload: UserPayload
): Promise<HttpResponse<IUser>> => {
  const url = `${prefix}/unactive/${id}`;
  return HttpClient.patch<IUser>(url, payload as any);
};

export const activeUser = async (
  id: string | number,
  payload: UserPayload
): Promise<HttpResponse<IUser>> => {
  const url = `${prefix}/active/${id}`;
  return HttpClient.patch<IUser>(url, payload as any);
}

export const deleteUser = (id: string | number) => {
    return HttpClient.delete<any, HttpResponse<IUser | null>>(
        `${prefix}/delete/${id}`
    )
}