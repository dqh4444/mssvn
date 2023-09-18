import { createContext, useState, useContext, Dispatch, SetStateAction } from "react"

const list_type_watch = ["stopwatch", "countdown"] as const
type type_watch = (typeof list_type_watch)[number]

export interface IStopwatchLog {
    key: string
    kind: "split" | "start" | "pause"
    interval: string
    time_recorded: string
    created_at: string
}

interface IContext {
    typeWatch: type_watch
    setTypeWatch: Dispatch<SetStateAction<type_watch>>
    stopwatchLogs: IStopwatchLog[]
    setStopwatchLogs: Dispatch<SetStateAction<IStopwatchLog[]>>
    isStopwatchPaused: boolean
    setIsStopwatchPaused: Dispatch<SetStateAction<boolean>>
}
export const StopwatchContext = createContext<IContext>(null)

const StopwatchProvider = ({ children }: any) => {
    const [typeWatch, setTypeWatch] = useState<type_watch>("stopwatch")
    const [isStopwatchPaused, setIsStopwatchPaused] = useState<boolean>(true)
    const [stopwatchLogs, setStopwatchLogs] = useState<IStopwatchLog[]>([])

    return (
        <StopwatchContext.Provider
            value={{
                typeWatch,
                setTypeWatch,
                stopwatchLogs,
                setStopwatchLogs,
                isStopwatchPaused,
                setIsStopwatchPaused
            }}
        >
            {children}
        </StopwatchContext.Provider>
    )
}

export const useStopwatchContext = () => {
    const context = useContext(StopwatchContext)

    if (context === undefined) {
        throw new Error(`useContext must be used within a Provider`)
    }

    return context
}

export default StopwatchProvider
