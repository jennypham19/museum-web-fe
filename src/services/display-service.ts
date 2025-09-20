import type { HttpResponse } from '@/types/common';
import { Images} from '@/types/post';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './permission-service';
import { IPainting } from '@/types/display';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/display`;

interface PaintingRequest{
    name: string;
    author: string;
    period: string;
    imageUrl: string;
    description: string;
    images: Images[];
}

export type PaintingsResponse = PaginatedResponse<IPainting>;

// Thêm mới tác phẩm
export const createPainting = (payload: PaintingRequest) => {
    return HttpClient.post(`${prefix}/create-painting`, payload)
}

// Lấy danh sách
export const getPaintings = (params: GetParams) => {
    return HttpClient.get<any, HttpResponse<PaintingsResponse>>(`${prefix}/get-list-paintings`, { params })
}