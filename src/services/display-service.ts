import type { HttpResponse } from '@/types/common';
import { Images} from '@/types/post';
import HttpClient from '@/utils/HttpClient';
import { ICollection, IPainting } from '@/types/display';
import QueryString from 'qs';
import { PaginatedResponse } from './base-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/display`;

interface PaintingRequest{
    name: string;
    author: string;
    period: string;
    imageUrl: string;
    nameImage: string;
    description: string;
    images: Images[];
}

interface CollectionRequest{
  name: string;
  tags: string;
  description: string;
  imageUrl: string | null;
  nameImage: string | null;
  curatorId: number | null;
  status?: string
}

export type PaintingsResponse = PaginatedResponse<IPainting>;
export type CollectionsResponse = PaginatedResponse<ICollection>;

export interface Payload {
  status: string,
  userIdApprove?: number
}

export interface PaintingPublished {
  is_published: boolean
}

export interface ApprovalReject {
  status: string,
  userIdApprove?: number,
  rejectionReason?: string
}

export interface GetParams{
  page: number;
  limit: number;
  status?: string | string[];
  searchTerm?: string;
  curatorId?: number
}

export interface SendApprovalForAdminRequest{
  status: string,
  reasonSend: string;
  userIdSend: number | undefined;
  note?: string | null
}

// Thêm mới tác phẩm
export const createPainting = (payload: PaintingRequest) => {
    return HttpClient.post(`${prefix}/create-painting`, payload)
}

// Thêm mới bộ sưu tập
export const createCollection = async(payload: CollectionRequest) => {
  return HttpClient.post(`${prefix}/create-collection`, payload)
}

// Chỉnh sửa bộ sưu tập
export const updateCollection = async(id: number, payload: CollectionRequest) => {
  const url = `${prefix}/update-collection/${id}`;
  return HttpClient.put<any>(url, payload as any)
}

// Lấy danh sách tác phẩm
export const getPaintings = async(params: GetParams) : Promise<HttpResponse<PaintingsResponse>> => {
  const url = `${prefix}/get-list-paintings`;
  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaintingsResponse;
  }>(url, { 
    params,
    // cấu hình paramsSerializer để ép axios serialize array kiểu role=employee&role=admin (Sequelize xử lý ngon hơn)
    paramsSerializer: (params) =>
      QueryString.stringify(params, { arrayFormat: "repeat"}),
    // => status=created or status=pending&status=reviewing...
  });
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy ra danh sách bộ sưu tập
export const getCollections = async(getParams: GetParams) : Promise<HttpResponse<CollectionsResponse>> => {
  const url = `${prefix}/get-list-collections`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
    curatorId: getParams.curatorId,
    status: getParams.status
  }
  if(getParams.searchTerm && getParams.searchTerm.trim()) {
    params.searchTerm = getParams.searchTerm
  }
  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: CollectionsResponse;
  }>(url, { 
    params,
    // cấu hình paramsSerializer để ép axios serialize array kiểu role=employee&role=admin (Sequelize xử lý ngon hơn)
    paramsSerializer: (params) =>
      QueryString.stringify(params, { arrayFormat: "repeat"}),
    // => status=created or status=pending&status=reviewing...
  });
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Gửi phê duyệt
export const sendApproval = async(id: number, type: string, payload: Payload): Promise<HttpResponse<any>> => {
    const url = `${prefix}/send-approval-${type}/${id}`;
    return HttpClient.patch<any>(url, payload as any);
}

// Đăng tải
export const publishPainting = async(id: number, payload: PaintingPublished) : Promise<HttpResponse<any>> => {
  const url = `${prefix}/publish-painting/${id}`;
  return HttpClient.patch<any>(url, payload as any);
}

// Mod và admin duyệt
export const approve = async(id: number, type: string, payload: Payload) : Promise<HttpResponse<any>> => {
  const url = `${prefix}/approve-${type}/${id}`;
  return HttpClient.put<any>(url, payload as any)
}

// Gửi lên cho admin
export const sendApprovalForAdmin = async(id: number, type: string, payload: SendApprovalForAdminRequest) : Promise<HttpResponse<any>> => {
  const url = `${prefix}/send-${type}/${id}`;
  return HttpClient.put<any>(url, payload as any)
}

// Từ chối
export const rejectApproval = async(id: number, type: string, payload: ApprovalReject) : Promise<HttpResponse<any>> => {
  const url = `${prefix}/reject-${type}/${id}`;
  return HttpClient.put<any>(url, payload as any)
}

// Xóa tác phẩm
export const deletePainting = async(id: number) => {
  const url = `${prefix}/delete-painting/${id}`;
  return HttpClient.delete(url)
}

// Gỡ tác phẩm khỏi bộ sưu tập
export const detachArtFromCollection = async(collectionId: number, payload: { artIds: number[] }) => {
  const url = `${prefix}/detach-art-from-collection/${collectionId}`;
  return HttpClient.delete(url, { data: payload } as any)
}

// Gán tác phẩm vào bộ sưu tập
export const attachArtFromCollection = async(collectionId: number, payload: { artIds: number[] }) => {
  const url = `${prefix}/attach-art-to-collection/${collectionId}`;
  return HttpClient.put(url, payload as any)
}

// Lấy chi tiết bộ sưu tập có tác phẩm bên trong
export const getCollectionHasArtById = async (id: number) => {
  const url = `${prefix}/get-collection-has-art-by-id/${id}`;
  return HttpClient.get<HttpResponse<ICollection | null>>(url)
}
