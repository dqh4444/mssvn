import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import { store } from "./store"
import { HelmetProvider } from "react-helmet-async"

import "./assets/styles/variables.css"
import "./assets/styles/reset.css"
import "./assets/styles/base.css"
import "./assets/styles/custom-antd.scss"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 8,
                            colorPrimary: "#de4e4e",
                            fontFamily: '"Poppins", sans-serif',
                        }
                    }}
                >
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
)
