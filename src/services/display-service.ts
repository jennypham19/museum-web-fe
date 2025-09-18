import type { HttpResponse } from '@/types/common';
import { Images} from '@/types/post';
import HttpClient from '@/utils/HttpClient';

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

// Thêm mới tác phẩm
export const createPainting = (payload: PaintingRequest) => {
    return HttpClient.post(`${prefix}/create-painting`, payload)
}