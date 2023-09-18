import { useQuery } from "react-query"
import { fetchData } from "@/helpers/axios"
import { PaginationDataResponse } from "@/types/pagination"
import { API_PATH_WORD_GROUPS } from "@/configs/api-path"
import { IResourceWordGroup } from "@/types/resources/word-group"
import { useState } from "react"

export default function useFetchWordGroups(deleted: string = "") {
    const [page, setPage] = useState<number>(1)

    const { isLoading, data, error, isFetching, refetch } = useQuery(
        ["useFetchWordGroups", deleted, page],
        () =>
            fetchData<PaginationDataResponse<IResourceWordGroup>>(API_PATH_WORD_GROUPS, {
                page,
                limit: 10,
                deleted
            }),
        {
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    )

    return {
        isLoading: isLoading || isFetching,
        data: data?.payload.data || [],
        pagination: data?.payload?.pagination,
        error: error as any,
        refetch,
        page,
        setPage
    }
}
