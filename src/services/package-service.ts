import { HttpResponse } from "@/types/common";
import { IPackageMember } from "@/types/landingpage";
import HttpClient from "@/utils/HttpClient";
import { FormDataPackages } from "@/views/Manage/Packages";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/packages`;

interface GetPackageParams{
    page: number;
    limit: number;
    searchTerm?: string;
}

interface PaginatedResponse<T>{
    packages: T[];
    totalPages: number;
    currentPage: number;
    totalPackages: number;
}

export type PackagesResponse = PaginatedResponse<IPackageMember>;

//Lấy danh sách
export const getPackages = (params: GetPackageParams) => {
    return HttpClient.get<any, HttpResponse<PackagesResponse>>(`${prefix}/list`, { params })
}

export const createPackage = (payload: FormDataPackages) => {
    return HttpClient.post<FormDataPackages, HttpResponse>(`${prefix}`, payload)
}