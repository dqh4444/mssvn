import {
    PAGE_ROUTE_CREATE_VOCABULARY,
    PAGE_ROUTE_CREATE_VOCABULARY_LESSON,
    PAGE_ROUTE_SETTING,
    PAGE_ROUTE_USER
} from "@/configs/page-route"
import {
    BlockOutlined,
    FileTextOutlined,
    KeyOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    ReadOutlined,
    SearchOutlined,
    SettingOutlined,
    UnderlineOutlined,
    UserOutlined
} from "@ant-design/icons"
import { Dropdown, Input, Avatar, Badge, Divider, Space, Button, message } from "antd"
import { useToken } from "antd/es/theme/internal"
import React, { useState } from "react"
import { HiOutlineBell, HiOutlineChatAlt2 } from "react-icons/hi"
import { MdLogout, MdPassword } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { RiUser3Line, RiSettings4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setCollapsed, setIsLoggedOut } from "@/store/slices/app"
import { IResourceSideNote } from "@/types/resources/side-note"
import ChangePasswordModal from "./change-password-modal"

export default function Header() {
    const [isAddSideNoteModalDisplaying, setIsAddSideNoteModalDisplaying] = useState<boolean>(false)
    const [isChangePasswordDisplaying, setIsChangePasswordDisplaying] = useState<boolean>(false)
    const [isAddItemDropdownOpen, setIsAddItemDropdownOpen] = useState(false)
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const user_info = useSelector((state: RootState) => state.user_info.user)

    const [, token] = useToken()

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary
    }

    const handleLogout = () => {
        dispatch(setIsLoggedOut())
    }

    const list_add_new_dropdown = [
        {
            icon: <BlockOutlined size={17}></BlockOutlined>,
            title: "Tạo ghi chú",
            handle: () => setIsAddSideNoteModalDisplaying(true)
        }
    ]

    const list_user_dropdown = [
        // {
        //     icon: <RiSettings4Line size={17}></RiSettings4Line>,
        //     title: "Cài đặt",
        //     handle: () => navigate(PAGE_ROUTE_SETTING)
        // },
        {
            icon: <MdPassword size={17}></MdPassword>,
            title: "Đổi mật khẩu",
            handle: () => setIsChangePasswordDisplaying(true),
            has_bottom_devider: true
        },
        {
            icon: <MdLogout size={17}></MdLogout>,
            title: "Đăng xuất",
            handle: handleLogout,
            has_bottom_devider: false
        }
    ]

    if (user_info) {
        list_user_dropdown.unshift({
            icon: <RiUser3Line size={17}></RiUser3Line>,
            title: "Hồ sơ",
            handle: () => navigate(`${PAGE_ROUTE_USER}/${user_info?.user.username}`),
            has_bottom_devider: false
        })
    }

    return (
        <>
            <ChangePasswordModal
                open={isChangePasswordDisplaying}
                onCancel={() => setIsChangePasswordDisplaying(false)}
            ></ChangePasswordModal>

            <header className="component-height-header shrink-0 border-b-[1px] border-border bg-white">
                <div className="component-main-section flex h-full items-center space-x-2 tablet:space-x-4">
                    <p className="component-text-header">MSSVN</p>

                    <Button
                        className="tablet:hidden mr-4"
                        type="default"
                        onClick={() => dispatch(setCollapsed(true))}
                    >
                        <MenuUnfoldOutlined />
                    </Button>

                    <div className="!ml-auto"></div>

                    <div className="flex space-x-2 items-center">
                        <Avatar size={32} icon={<UserOutlined />} />
                        <p>Manh</p>
                    </div>

                    <Avatar size={32}>
                        <HiOutlineChatAlt2 size="26" />
                    </Avatar>

                    <Badge count={1}>
                        <Avatar size={32}>
                            <HiOutlineBell size="26" />
                        </Avatar>
                    </Badge>

                    <Dropdown
                        open={isUserDropdownOpen}
                        onOpenChange={(visible) => setIsUserDropdownOpen(visible)}
                        className="cursor-pointer"
                        dropdownRender={() => (
                            <div className="overflow-hidden" style={contentStyle}>
                                {user_info && (
                                    <div className="py-3 px-5 flex items-center space-x-2">
                                        <Avatar size={32} icon={<UserOutlined />} />

                                        <div>
                                            <p className="font-semibold">
                                                {user_info.user.user_information.fullname}
                                            </p>
                                            <p className="text-[0.85rem]">{user_info.user.email}</p>
                                        </div>
                                    </div>
                                )}
                                <Divider style={{ marginTop: 6, marginBottom: 6 }} />

                                {list_user_dropdown.map((dropdown, index) => (
                                    <React.Fragment key={index}>
                                        <div
                                            className="py-3 px-5 flex items-center space-x-2 cursor-pointer hover:bg-bg"
                                            onClick={() => {
                                                setIsUserDropdownOpen(false)
                                                dropdown.handle()
                                            }}
                                        >
                                            {dropdown.icon && dropdown.icon}
                                            <p>{dropdown.title}</p>
                                        </div>

                                        {dropdown.has_bottom_devider && (
                                            <Divider style={{ marginTop: 6, marginBottom: 6 }} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        placement="bottomRight"
                    >
                        <Avatar size={32} icon={<SettingOutlined />} />
                    </Dropdown>
                </div>
            </header>
        </>
    )
}
