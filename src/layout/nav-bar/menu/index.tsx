import React, { useEffect } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Menu, Tag } from "antd"
import { Link, useLocation } from "react-router-dom"
import { list_protected_routes } from "@/routes/config"
import { useDispatch } from "react-redux"
import { toggleCollapsed } from "@/store/slices/app"
import { IRouteBase } from "@/routes/types"

const MenuApp = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation()

    const dispatch = useDispatch()

    const showMenuItems = (list_routes: IRouteBase[]) => {
        return list_routes
            .filter((item) => item?.menu?.show)
            .map((item, index) =>
                item?.children?.length ? (
                    <React.Fragment key={index}>
                        {item?.menu.has_top_devider && <Menu.Divider></Menu.Divider>}

                        {item?.menu?.type_parent === "group" ? (
                            <Menu.ItemGroup
                                key={item?.menu?.key || item?.path}
                                title={item.metadata.title}
                            >
                                {showMenuItems(item.children)}
                            </Menu.ItemGroup>
                        ) : (
                            <Menu.SubMenu
                                key={item?.menu?.key || item?.path}
                                title={item.metadata.title}
                                icon={item.icon}
                            >
                                {showMenuItems(item.children)}
                            </Menu.SubMenu>
                        )}
                    </React.Fragment>
                ) : (
                    <React.Fragment key={index}>
                        {item?.menu.has_top_devider && <Menu.Divider></Menu.Divider>}

                        <Menu.Item key={item?.menu?.key || item?.path} title={item.metadata.title}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.metadata.title}</span>
                                {item?.is_comming && (
                                    <Tag className="ml-3" color="red">
                                        <span className="text-[0.8rem]">soon</span>
                                    </Tag>
                                )}
                            </Link>
                        </Menu.Item>
                    </React.Fragment>
                )
            )
    }

    return (
        <div className="w-full flex flex-col h-[calc(100vh-64px)] tablet:h-[calc(100vh-80px)]">
            <Menu
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                inlineCollapsed={collapsed}
                className="h-full overflow-auto"
            >
                {showMenuItems(list_protected_routes)}
            </Menu>

            <div className="hidden tablet:util-flex-center mt-4 flex-1">
                <Button type="default" onClick={() => dispatch(toggleCollapsed())}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
        </div>
    )
}

export default MenuApp
