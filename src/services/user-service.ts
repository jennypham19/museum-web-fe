import type { HttpResponse } from '@/types/common';
import { IUser } from '@/types/user';
import HttpClient from '@/utils/HttpClient';

const prefix = 'users';

export const getCurrentUser = () => {
  return HttpClient.get<HttpResponse<IUser>>(`${prefix}/me`);
};

export const uploadEmployeeImage = (file: File, type: string): Promise<HttpResponse<{ imageUrl: string }>> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('type', type);
  
  return HttpClient.post(
    `${prefix}/upload-image`, 
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
