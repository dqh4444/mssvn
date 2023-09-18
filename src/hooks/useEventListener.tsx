import { useEffect } from "react"

const useEventListener = (type: string, listener: any, ...options: any) => {
    useEffect(() => {
        window.addEventListener(type, listener, ...options)

        return () => {
            window.removeEventListener(type, listener, ...options)
        }
    }, [type, listener, options])
}

export default useEventListener
