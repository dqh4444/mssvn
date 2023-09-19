import { Link, useLocation } from "react-router-dom"
import MenuApp from "./menu"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import useWindowResize from "@/hooks/useWindowSize"
import { setCollapsed } from "@/store/slices/app"
import { useEffect } from "react"
import { MenuFoldOutlined } from "@ant-design/icons"
import Button from "antd/es/button/button"

const MAX_WIDTH_MOBILE = 768

export default function Navbar() {
    const location = useLocation()

    const dispatch = useDispatch()

    const windowSize = useWindowResize()

    const collapsed = useSelector((state: RootState) => state.app.collapsed)

    useEffect(() => {
        if (windowSize[0] < MAX_WIDTH_MOBILE) {
            dispatch(setCollapsed(false))
        }
    }, [windowSize, location])

    return (
        <>
            <section
                className={`${
                    collapsed
                        ? "w-[260px] tablet:w-[80px]"
                        : "left-[-260px] tablet:left-auto w-[240px] tablet:w-[200px] laptop:w-[240px] desktop:w-[280px]"
                } h-screen bg-white flex flex-col fixed z-50 tablet:relative shadow tablet:shadow-none transition-all`}
            >
                <div className="util-flex-center shrink-0 component-height-header relative">
                    <Button
                        type="default"
                        className="tablet:hidden absolute top-1/2 -translate-y-1/2 right-2"
                        onClick={() => dispatch(setCollapsed(false))}
                    >
                        <MenuFoldOutlined />
                    </Button>
                </div>

                <MenuApp collapsed={windowSize[0] < 768 ? false : collapsed}></MenuApp>
            </section>

            <div
                className={`fixed top-0 left-0 w-screen h-screen bg-black/30 z-40 backdrop-blur-sm ${
                    collapsed ? "tablet:hidden" : "hidden"
                }`}
            ></div>
        </>
    )
}
