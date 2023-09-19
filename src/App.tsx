import { Suspense, useEffect } from "react"
import Layout from "@/layout"
import { Alert, Spin } from "antd"
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"
import { flattenRoute } from "./routes/utils"
import {
    list_protected_routes_hidden_in_menu,
    list_protected_routes,
    list_public_routers
} from "./routes/config"
import { PAGE_ROUTE_DASHBOARD, PAGE_ROUTE_LOGIN } from "./configs/page-route"
import ProtectedRoute from "./routes/protected-route"
import { useSelector } from "react-redux"
import { RootState } from "./store"
import React from "react"
import { Helmet } from "react-helmet-async"
import { IMetadata } from "./routes/types"
import { MAIN_DOMAIN, SLOGAN_BRAND } from "./configs"
import ErrorBoundary from "./components/error-boundary"

const NotFound = React.lazy(() => import("@/pages/_system/not-found"))
const FeatureIsComming = React.lazy(() => import("pages/_system/feature-is-comming"))

const Metadata = ({ metadata, path }: { metadata?: IMetadata; path: string }) => {
    if (!metadata) {
        return (
            <Helmet>
                <title>mssvn</title>
                <meta name="description" content={SLOGAN_BRAND}></meta>
            </Helmet>
        )
    }

    const title = `${metadata.title} - mssvn`

    const url = `${MAIN_DOMAIN}${path}`

    const image = `https://lorempixel.com/400/200/`

    const keywords = `phần mềm hoc tập, từ vựng, học từ vựng`

    return (
        <Helmet>
            <meta httpEquiv="content-language" content="vi"></meta>

            <title>{title}</title>

            <meta name="description" content={metadata.description}></meta>

            <link rel="canonical" href={url} />

            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={metadata.description} />
            <meta itemProp="image" content={image} />
            <meta itemProp="keywords" content={keywords} />
            <meta itemProp="news_keywords" content={keywords} />

            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="300" />
            <meta property="og:image:height" content="300" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={title} />
        </Helmet>
    )
}

export default function App() {
    const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn)
    const redirectPath = useSelector((state: RootState) => state.app.redirectPath)

    useEffect(() => {
        document.documentElement.classList.add("dark")
    }, [])

    const list_flatten_protected_routes = flattenRoute(list_protected_routes)

    const list_flatten_protected_routes_hidden_in_menu = flattenRoute(
        list_protected_routes_hidden_in_menu
    )

    const renderProtectedRoutes = () => {
        return [
            ...list_flatten_protected_routes,
            ...list_flatten_protected_routes_hidden_in_menu
        ].map((route_item, index) => (
            <Route
                path={route_item.path}
                element={
                    <ProtectedRoute
                        isAuthenticated={isLoggedIn}
                        authenticationPath={PAGE_ROUTE_LOGIN}
                        redirectPath={route_item.path}
                        outlet={
                            route_item?.has_layout ? (
                                <Layout>
                                    <Metadata
                                        metadata={route_item.metadata}
                                        path={route_item.path}
                                    ></Metadata>
                                    <ErrorBoundary>
                                        {route_item?.is_comming ? (
                                            <FeatureIsComming></FeatureIsComming>
                                        ) : (
                                            route_item.component
                                        )}
                                    </ErrorBoundary>
                                </Layout>
                            ) : (
                                <React.Fragment>
                                    <Metadata
                                        metadata={route_item.metadata}
                                        path={route_item.path}
                                    ></Metadata>
                                    <ErrorBoundary>
                                        {route_item?.is_comming ? (
                                            <FeatureIsComming></FeatureIsComming>
                                        ) : (
                                            route_item.component
                                        )}
                                    </ErrorBoundary>
                                </React.Fragment>
                            )
                        }
                    />
                }
                key={index}
            ></Route>
        ))
    }

    const renderPublicRoutes = () => {
        return list_public_routers.map((route_item, index) => (
            <Route
                // element={
                    // isLoggedIn ? <Navigate to={redirectPath || PAGE_ROUTE_DASHBOARD} /> : <Outlet />
                // }
                key={index}
            >
                <Route
                    path={route_item.path}
                    element={
                        <React.Fragment>
                            <Metadata
                                metadata={route_item.metadata}
                                path={route_item.path}
                            ></Metadata>
                            <ErrorBoundary>
                                {route_item?.is_comming ? (
                                    <FeatureIsComming></FeatureIsComming>
                                ) : (
                                    route_item.component
                                )}
                            </ErrorBoundary>{" "}
                        </React.Fragment>
                    }
                ></Route>
            </Route>
        ))
    }

    return (
        <Suspense
            fallback={
                <div className="h-screen w-screen util-flex-col-center space-y-4">
                    <Spin></Spin>
                </div>
            }
        >
            <Router>
                <Routes>
                    {renderProtectedRoutes()}
                    {renderPublicRoutes()}

                    <Route
                        path={"/*"}
                        element={
                            <React.Fragment>
                                <Metadata path={`/not-found`}></Metadata>
                                <NotFound></NotFound>
                            </React.Fragment>
                        }
                    ></Route>
                </Routes>
            </Router>
        </Suspense>
    )
}
