import { PaginatedResponse } from "@/services/permission-service";
import { HttpResponse } from "@/types/common";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react"

interface FetchParams {
  page: number;
  limit: number;
  status?: string | string[];
  searchTerm?: string;
}

export const useDataList = <T>(fn: (params: FetchParams) => Promise<HttpResponse<PaginatedResponse<T>>>, rowsPerPage: number = 10, status?: string | string[]) => {
    const [listData, setListData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = useCallback(async(page: number, limit: number, status?: string | string[] , searchTerm?: string) => {
        setLoading(true);
        try {
            const res = await fn({ page: page, limit: limit, status: status, searchTerm: searchTerm});
            const data = res.data?.data as any as T[];
            setListData(data);
            res.data?.total && setTotal(res.data.total)
        } catch (error: any) {
            setError(error.message);
            setListData([]);
            setTotal(0)
        }finally {
            setLoading(false);
        }
    }, [fn]);

    const debounceGet = useMemo(
        () => debounce((page: number, limit: number, status?: string | string[], searchTerm?: string) => {
            fetchData(page, limit, status, searchTerm);
        }, 500),
        [fetchData]
    )

    useEffect(() => {
        if(searchTerm) {
            debounceGet(page, rowsPerPage, status, searchTerm)
        }else {
            debounceGet.cancel();
            fetchData(page, rowsPerPage, status)
        }
    }, [page, rowsPerPage, searchTerm, status, fetchData, debounceGet]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    }

    return {
        listData,
        searchTerm,
        loading,
        error,
        handlePageChange,
        handleSearch,
        total,
        page,
        rowsPerPage,
        fetchData
    }
}