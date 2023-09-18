import { useQuery } from "react-query"
import { fetchData } from "@/helpers/axios"
import { PaginationDataResponse } from "@/types/pagination"
import { ROUTER_SIDE_NOTE } from "@/configs/api-path"
import { IResourceSideNote } from "@/types/resources/side-note"
import { useEffect, useState } from "react"

export default function useFetchSideNotes(deleted: string = "") {
    const [listItems, setListItems] = useState<IResourceSideNote[]>([])

    const { isLoading, data, error, isFetching, refetch } = useQuery(
        ["useFetchSideNotes", deleted],
        () =>
            fetchData<PaginationDataResponse<IResourceSideNote>>(ROUTER_SIDE_NOTE, {
                deleted
            }),
        {
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    )

    useEffect(() => {
        setListItems(data?.payload.data || [])
    }, [data])

    return {
        isLoading: isLoading || isFetching,
        listItems,
        setListItems,
        error: error as any,
        refetch
    }
}
