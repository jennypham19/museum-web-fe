import { PaginatedResponse } from "@/services/base-service";
import { HttpResponse } from "@/types/common";
import { useCallback, useEffect, useState } from "react";

interface FetchParams {
  page: number;
  limit: number;
  status?: string | string[];
  curatorId?: number,
}

export const useLoadData = <T>(
    fn: (params: FetchParams, type?: string) => Promise<HttpResponse<PaginatedResponse<T>>>, 
    rowsPerPage: number = 10, 
    status?: string | string[], 
    curatorId?: number
) => {
    const query = {
        page: 1,
    }
    const [data, setData] = useState<{ objectCreated: T[], objectAll: T[]}>({ objectCreated: [], objectAll: []});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false)

    // Gọi 2 api cùng một lúc
    const fetchDatas = useCallback(async(page: number, limit: number, status?: string | string[], curatorId?: number) => {
        setLoading(true);
        try {
            const [objectCreated, objectAll] = await Promise.all([
                fn({ page: page, limit: limit, status: 'created', curatorId: curatorId }),
                fn({ page: page, limit: limit, status: status, curatorId: curatorId })
            ])
            const dataCreated = objectCreated.data?.data as any as T[];
            const dataAll = objectAll.data?.data as any as T[];
            setData({ objectCreated: dataCreated, objectAll: dataAll})
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    },[fn]);

    useEffect(() => {
        fetchDatas(query.page, rowsPerPage, status, curatorId)
    },[query.page, rowsPerPage, status, curatorId])

    return {
        error,
        loading,
        data,
        fetchDatas
    }
}