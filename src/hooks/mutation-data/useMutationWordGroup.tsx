import { useQuery } from "react-query"
import { fetchData } from "@/helpers/axios"
import { PaginationDataResponse } from "@/types/pagination"
import { API_PATH_PUBLIC_PACKAGES } from "@/configs/api-path"
import { IResourceWord } from "@/types/resources/word"

export default function useMutationWordGroup() {
    const { isLoading, data, error, isFetching, refetch } = useQuery(
        ["useFetchPackages"],
        () => fetchData<PaginationDataResponse<IResourceWord>>(API_PATH_PUBLIC_PACKAGES),
        {
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    )

    return {
        isLoading,
        data: data?.payload.data || [],
        error: error as any,
        isFetching,
        refetch
    }
}
