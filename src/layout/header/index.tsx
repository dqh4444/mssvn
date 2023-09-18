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
    UnderlineOutlined,
    UserOutlined
} from "@ant-design/icons"
import { Dropdown, Input, Avatar, Badge, Divider, Space, Button, message } from "antd"
import { useToken } from "antd/es/theme/internal"
import React, { useState } from "react"
import { HiOutlineBell } from "react-icons/hi"
import { MdLogout, MdPassword } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { RiUser3Line, RiSettings4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setCollapsed, setIsLoggedOut } from "@/store/slices/app"
import { ReactComponent as LogoBrandSvg } from "@/assets/svgs/logo_brand.svg"
import AddSideNoteModal from "@/pages/utilities/side-note/add-item-modal"
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
            icon: <UnderlineOutlined />,
            title: "Tạo từ vựng",
            handle: () => {
                navigate(PAGE_ROUTE_CREATE_VOCABULARY)
            }
        },
        {
            icon: <FileTextOutlined size={17}></FileTextOutlined>,
            title: "Tạo học phần",
            handle: () => navigate(PAGE_ROUTE_CREATE_VOCABULARY_LESSON)
        },
        {
            icon: <BlockOutlined size={17}></BlockOutlined>,
            title: "Tạo ghi chú",
            handle: () => setIsAddSideNoteModalDisplaying(true)
        },
        {
            icon: <ReadOutlined size={17}></ReadOutlined>,
            title: "Tạo bài kiểm tra",
            handle: () => navigate(PAGE_ROUTE_CREATE_VOCABULARY_LESSON)
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
            <AddSideNoteModal
                open={isAddSideNoteModalDisplaying}
                onCancel={() => setIsAddSideNoteModalDisplaying(false)}
            ></AddSideNoteModal>

            <ChangePasswordModal
                open={isChangePasswordDisplaying}
                onCancel={() => setIsChangePasswordDisplaying(false)}
            ></ChangePasswordModal>

            <header className="component-height-header shrink-0 border-b-[1px] border-border bg-white">
                <div className="px-2 tablet:px-4 laptop:px-6 flex h-full items-center space-x-2 tablet:space-x-4">
                    <Input
                        placeholder="Tìm kiếm"
                        className="w-[280px] hidden tablet:inline-flex input-search"
                        prefix={<SearchOutlined />}
                    />

                    <Button
                        className="tablet:hidden mr-4"
                        type="default"
                        onClick={() => dispatch(setCollapsed(true))}
                    >
                        <MenuUnfoldOutlined />
                    </Button>

                    <LogoBrandSvg className="tablet:hidden"></LogoBrandSvg>

                    <div className="!ml-auto"></div>

                    <Dropdown
                        open={isAddItemDropdownOpen}
                        onOpenChange={(visible) => setIsAddItemDropdownOpen(visible)}
                        trigger={["click"]}
                        className="cursor-pointer"
                        dropdownRender={() => (
                            <div className="overflow-hidden" style={contentStyle}>
                                {list_add_new_dropdown.map((dropdown, index) => (
                                    <React.Fragment key={index}>
                                        <div
                                            className="py-3 px-5 flex items-center space-x-2 cursor-pointer hover:bg-bg"
                                            onClick={() => {
                                                setIsAddItemDropdownOpen(false)
                                                dropdown.handle()
                                            }}
                                        >
                                            {dropdown.icon && dropdown.icon}
                                            <p>{dropdown.title}</p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        placement="bottomRight"
                    >
                        <Avatar
                            style={{ backgroundColor: "var(--color-success)" }}
                            size={38}
                            icon={<PlusOutlined />}
                        />
                    </Dropdown>

                    <Badge count={1}>
                        <Avatar size={36}>
                            <HiOutlineBell size="32" />
                        </Avatar>
                    </Badge>

                    {/* <HiOutlineSun size="26"></HiOutlineSun> */}

                    {/* <HiOutlineMoon size="26"></HiOutlineMoon> */}

                    <Dropdown
                        open={isUserDropdownOpen}
                        onOpenChange={(visible) => setIsUserDropdownOpen(visible)}
                        className="cursor-pointer"
                        dropdownRender={() => (
                            <div className="overflow-hidden" style={contentStyle}>
                                {user_info && (
                                    <div className="py-3 px-5 flex items-center space-x-2">
                                        <Avatar size={36} icon={<UserOutlined />} />

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
                        <Avatar size={38} icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </header>
        </>
    )
}
