import React from "react"
import { Breadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom"
import { list_protected_routes_hidden_in_menu, list_protected_routes } from "@/routes/config"
import { PAGE_ROUTE_DASHBOARD } from "@/configs/page-route"
import { HomeOutlined } from "@ant-design/icons"

export default function BreadcrumbByRoute() {
    const { pathname } = useLocation()

    const route = [...list_protected_routes_hidden_in_menu, ...list_protected_routes].find(
        (item) => item.path === pathname
    )
    if (!route || !route.breadcrumb) {
        return <></>
    }

    return (
        <Breadcrumb
            className="mb-4"
            items={[
                {
                    title: (
                        <Link to={PAGE_ROUTE_DASHBOARD}>
                            <HomeOutlined className="mr-1"></HomeOutlined>
                            <span>Trang chủ</span>
                        </Link>
                    )
                },
                ...route.breadcrumb.map((item) => ({
                    title: (
                        <Link className="flex space-x-1" to={item.path}>
                            {item?.icon && item.icon}
                            <span>{item?.title || "Trang"}</span>
                        </Link>
                    )
                })),
                {
                    title: route?.metadata?.title || "Trang"
                }
            ]}
        />
    )
}
