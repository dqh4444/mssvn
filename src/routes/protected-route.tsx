import { PAGE_ROUTE_DASHBOARD } from "@/configs/page-route"
import { Navigate, useLocation } from "react-router"

function checkMatchingFormat(formatString, inputString) {
    const regex = new RegExp(formatString.replace(/:\w+/g, "[^/]+"))

    return regex.test(inputString)
}

export type ProtectedRouteProps = {
    isAuthenticated: boolean
    authenticationPath: string
    redirectPath: string
    outlet: JSX.Element
}

export default function ProtectedRoute({
    isAuthenticated,
    authenticationPath,
    redirectPath,
    outlet
}: ProtectedRouteProps) {
    const location = useLocation()

    if (
        isAuthenticated
    ) {
        return outlet
    }

    return (
        <Navigate
            to={{
                pathname: redirectPath
            }}
        />
    )
}
