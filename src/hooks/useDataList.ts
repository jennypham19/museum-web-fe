import { PaginatedResponse } from "@/services/permission-service";
import { HttpResponse } from "@/types/common";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react"

interface FetchParams {
  page: number;
  limit: number;
  searchTerm?: string;
}

export const useDataList = <T>(fn: (params: FetchParams) => Promise<HttpResponse<PaginatedResponse<T>>>) => {
    const [listData, setListData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = useCallback(async(page: number, limit: number, searchTerm?:string) => {
        setLoading(true);
        try {
            const res = await fn({ page: page, limit: limit, searchTerm: searchTerm});
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
    }, []);

    const debounceGet = useMemo(
        () => debounce((page: number, limit: number, searchTerm?: string) => {
            fetchData(page, limit, searchTerm);
        }, 500),
        [fetchData]
    )

    useEffect(() => {
        if(searchTerm) {
            debounceGet(page, rowsPerPage, searchTerm)
        }else {
            debounceGet.cancel();
            fetchData(page, rowsPerPage)
        }
    }, [page, rowsPerPage, searchTerm]);

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