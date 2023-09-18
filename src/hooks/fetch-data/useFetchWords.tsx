import { useQuery } from "react-query"
import { fetchData } from "@/helpers/axios"
import { PaginationDataResponse } from "@/types/pagination"
import { API_PATH_WORDS } from "@/configs/api-path"
import { IResourceWord } from "@/types/resources/word"
import { useEffect, useState } from "react"
interface IProps {
    deleted?: boolean
    random?: boolean
    limit?: number
    is_memory?: boolean
}

export default function useFetchWords({
    deleted = false,
    random = false,
    limit = 20,
    is_memory = false
}: IProps) {
    const [starred, setStarred] = useState<boolean>(false)
    const [memorize, setMemorize] = useState<boolean>(is_memory)
    const [page, setPage] = useState<number>(1)
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [selectedWordGroups, setSelectedWordGroups] = useState<string[]>([])
    const [selectedLanguageCodes, setSelectedLanguageCodes] = useState<string[]>([])
    const [listItems, setListItems] = useState<IResourceWord[]>([])

    const { isLoading, data, error, isFetching, refetch } = useQuery(
        [
            "useFetchWords",
            deleted,
            page,
            startDate,
            endDate,
            selectedWordGroups,
            selectedLanguageCodes,
            starred,
            memorize
        ],
        () =>
            fetchData<PaginationDataResponse<IResourceWord>>(API_PATH_WORDS, {
                random: random ? "1" : "",
                starred: starred ? "1" : "",
                memorize: memorize ? "1" : "",
                deleted: deleted ? "1" : "",
                page,
                limit,
                start_date: startDate,
                end_date: endDate,
                word_group_ids: selectedWordGroups.join(","),
                language_codes: selectedLanguageCodes.join(",")
            }),
        {
            refetchOnReconnect: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    )

    useEffect(() => {
        setPage(1)
    }, [startDate, endDate, selectedWordGroups, selectedLanguageCodes, starred, memorize])

    useEffect(() => {
        const temp = data?.payload.data || []
        if (page === 1) {
            setListItems(temp)
        } else {
            setListItems((prev) => [...prev, ...temp])
        }
    }, [data])

    return {
        isLoading: isLoading || isFetching,
        pagination: data?.payload?.pagination,
        error: error as any,
        refetch,
        page,
        setPage,
        setStartDate,
        setEndDate,
        selectedWordGroups,
        setSelectedWordGroups,
        listItems,
        setListItems,
        starred,
        setStarred,
        memorize,
        setMemorize,
        selectedLanguageCodes,
        setSelectedLanguageCodes
    }
}
