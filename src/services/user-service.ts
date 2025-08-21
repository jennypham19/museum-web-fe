import type { HttpResponse } from '@/types/common';
import { IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

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
