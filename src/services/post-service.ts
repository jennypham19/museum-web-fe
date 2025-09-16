import type { HttpResponse } from '@/types/common';
import { Images, SourceLinks, Videos } from '@/types/post';
import HttpClient from '@/utils/HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/posts`;

interface PostCollectionRequest{
    category: number;
    date: string;
    title: string;
    summary: string;
    author: string;
    period: string;
    imageUrl: string;
    nameUrl: string;
    content: string;
    images: Images[];
    videos: Videos[];
    source?: SourceLinks | null;
    authorId: number;
}
export const createPostCollection = (payload: PostCollectionRequest) => {
    return HttpClient.post(`${prefix}/create-post-collection`, payload)
}