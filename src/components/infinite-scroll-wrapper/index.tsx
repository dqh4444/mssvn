import React, { useCallback, useEffect, useRef } from "react"

interface IProps {
    load: () => void
    page: number
    total_pages: number
    loader?: React.ReactNode
    children: React.ReactNode
}

export default function InfiniteScrollWrapper({
    load,
    page,
    total_pages,
    loader,
    children
}: IProps) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const hasMore = page < total_pages

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && hasMore) {
                load()
            }
        },
        [load]
    )

    useEffect(() => {
        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        })

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [load])

    useEffect(() => {
        if (observerRef.current && sentinelRef.current && hasMore) {
            observerRef.current.disconnect()
            observerRef.current.observe(sentinelRef.current)
        }
    }, [page])

    return (
        <div>
            {children}
            <div ref={sentinelRef}>{hasMore && loader && loader}</div>
        </div>
    )
}
