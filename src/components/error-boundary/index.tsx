import React from "react"

import { postData } from "@/helpers/axios"
import { API_PATH_USER_LOG } from "@/configs/api-path"
import ErrorPage from "./error-page"


type Props = {
    children: React.ReactNode
}

type State = {
    hasError: boolean
    error?: Error
    errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    async componentDidCatch(error: Error, errorInfo: React.ErrorInfo): Promise<void> {
        const domain = window.location.href

        await postData(API_PATH_USER_LOG, {
            error_json: {
                error: error.toString(),
                stack: errorInfo.componentStack
            },
            domain
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorPage></ErrorPage>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
