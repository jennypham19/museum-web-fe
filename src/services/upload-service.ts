import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/image`;

export const uploadImage = (file: File, type: string): Promise<HttpResponse<{ imageUrl: string }>> => {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('image', file);
  
  return HttpClient.post(
    `${prefix}/upload-image`, 
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};