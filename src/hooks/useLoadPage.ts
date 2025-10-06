import { useQueryClient } from "@tanstack/react-query";

export const useLoadPage = (page: number, limit: number, status?: string | string[], id?: number) => {
    const queryClient = useQueryClient();
    const dataCreated = queryClient.invalidateQueries({
        queryKey: ['data', 'created', page, limit, id]
    });
    const dataAll = queryClient.invalidateQueries({
        queryKey: ['data', status, page, limit, id]
    });
    return {
        dataCreated,
        dataAll
    }
}