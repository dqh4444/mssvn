import {
    PAGE_ROUTE_BLOG,
    PAGE_ROUTE_CHANGE_PASSWORD,
    PAGE_ROUTE_CREATE_VOCABULARY,
    PAGE_ROUTE_CREATE_VOCABULARY_LESSON,
    PAGE_ROUTE_CUSTOMER_SUPPORT,
    PAGE_ROUTE_DASHBOARD,
    PAGE_ROUTE_DONATE,
    PAGE_ROUTE_FORGET_PASSWORD,
    PAGE_ROUTE_LOGIN,
    PAGE_ROUTE_MIND_MAP,
    PAGE_ROUTE_PACKAGE,
    PAGE_ROUTE_REGISTER,
    PAGE_ROUTE_SETTING,
    PAGE_ROUTE_TUTORIAL,
    PAGE_ROUTE_USER,
    PAGE_ROUTE_VOCABULARY_GROUP,
    PAGE_ROUTE_VOCABULARY_LESSON,
    PAGE_ROUTE_VOCABULARY_STORE
} from "configs/page-route"
import React from "react"
import Icon, {
    DatabaseOutlined,
    FileTextOutlined,
    HomeOutlined,
    FileDoneOutlined,
    BlockOutlined,
    CalendarOutlined,
    ApartmentOutlined,
    ShoppingCartOutlined,
    CustomerServiceOutlined,
    HeartOutlined,
    InfoCircleOutlined,
    ReadOutlined,
    TeamOutlined,
    EllipsisOutlined,
    HistoryOutlined,
    FileSearchOutlined,
    HighlightOutlined,
    CalculatorOutlined,
    QrcodeOutlined,
    GroupOutlined
} from "@ant-design/icons"
import { IRouteBase } from "./types"
import { SLOGAN_BRAND } from "@/configs"


const list_protected_routes_hidden_in_menu: IRouteBase[] = [

]

const Dashboard = React.lazy(() => import("pages/dashboard"))
const Mhcp = React.lazy(() => import("pages/mhcp"))


const list_protected_routes: IRouteBase[] = [
    {
        component: <Dashboard></Dashboard>,
        path: PAGE_ROUTE_DASHBOARD,
        icon: <HomeOutlined />,
        has_layout: true,
        has_auth: true,
        metadata: {
            title: "Trang chủ",
            description: SLOGAN_BRAND
        },
        menu: {
            show: true
        }
    },
    {
        component: <Mhcp></Mhcp>,
        path: '/mhcp',
        icon: <HomeOutlined />,
        has_layout: true,
        has_auth: false,
        metadata: {
            title: "Trang chủ",
            description: SLOGAN_BRAND
        },
        menu: {
            show: true
        }
    },
]

const Login = React.lazy(() => import("@/pages/_system/auth/login"))
const Register = React.lazy(() => import("@/pages/_system/auth/register"))
const ForgetPassword = React.lazy(() => import("@/pages/_system/auth/forget-password"))
const ChangePassword = React.lazy(() => import("@/pages/_system/auth/change-password"))
const list_public_routers: IRouteBase[] = [
    {
        component: <Login></Login>,
        path: PAGE_ROUTE_LOGIN,
        metadata: {
            title: "Đăng nhập",
            description: SLOGAN_BRAND
        }
    },
    {
        component: <Register></Register>,
        path: PAGE_ROUTE_REGISTER,
        metadata: {
            title: "Đăng ký",
            description: SLOGAN_BRAND
        }
    },
    {
        component: <ForgetPassword></ForgetPassword>,
        path: PAGE_ROUTE_FORGET_PASSWORD,
        metadata: {
            title: "Quên mật khẩu",
            description: SLOGAN_BRAND
        }
    },
    {
        component: <ChangePassword></ChangePassword>,
        path: PAGE_ROUTE_CHANGE_PASSWORD,
        metadata: {
            title: "Đổi mật khẩu",
            description: SLOGAN_BRAND
        }
    }
]

export { list_public_routers, list_protected_routes, list_protected_routes_hidden_in_menu }
