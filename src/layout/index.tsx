import { useEffect, useState } from "react"
import Header from "./header"
import Navbar from "./nav-bar"
import { fetchData } from "@/helpers/axios"
import { IResourceUser } from "@/types/resources/user"
import { API_PATH_VERIFY_USER, ROUTER_SIDE_NOTE } from "@/configs/api-path"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "@/store/slices/user-info"
import { IResourceSideNote } from "@/types/resources/side-note"
import {
    setExitFullScreen,
    setFullScreen,
    setGlobalSideNote,
    setLanguageOptions
} from "@/store/slices/app"
import { Avatar, Tooltip } from "antd"
import { BsBookmarkStarFill } from "react-icons/bs"
import { RootState } from "@/store"
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons"
import useEventListener from "@/hooks/useEventListener"
import ConfigFirstTimeDrawer from "./config-first-time-drawer"
import ConnectNetwork from "./connect-network"
import { generatorCommonHandle } from "@/utils/generator-common-handle"
import { LIST_LANGUAGES } from "@/configs/list-languages"

export default function Layout({ children }: any) {
    const dispatch = useDispatch()

    const [isSideNoteDisplaying, setIsSideNoteDisplaying] = useState<boolean>(false)
    const [configFirstTimeDrawer, setConfigFirstTimeDrawer] = useState<boolean>(false)

    const globalSideNote = useSelector((state: RootState) => state.app.globalSideNote)

    const hasFullscreen = useSelector((state: RootState) => state.app.hasFullscreen)

    useEventListener(
        "fullscreenchange",
        () => !document.fullscreenElement && dispatch(setExitFullScreen())
    )

    useEventListener("keydown", (event: any) => {
        if (event.keyCode === 70 && document.activeElement === document.body) {
            document.fullscreenElement ? dispatch(setExitFullScreen()) : dispatch(setFullScreen())

            return
        }
    })

    useEffect(() => {
        verifyUser()
    }, [])

    useEffect(() => {
        getGlobalSideNote()
    }, [])

    const verifyUser = async () => {
        await generatorCommonHandle<IResourceUser>(
            () => fetchData<IResourceUser>(API_PATH_VERIFY_USER),
            null,
            async (payload: IResourceUser) => {
                dispatch(setUserInfo(payload))

                handleSetLanguageOptions(payload)

                if (!payload.config.config_for_first_time) {
                    setTimeout(() => setConfigFirstTimeDrawer(true), 896)
                }
            }
        )
    }

    const handleSetLanguageOptions = (payload: IResourceUser) => {
        if (payload.config.selected_language_codes.length === 0) {
            dispatch(
                setLanguageOptions(
                    LIST_LANGUAGES.map((item) => ({
                        label: item.name,
                        value: item.code
                    }))
                )
            )
            return
        }

        const temp = []
        LIST_LANGUAGES.forEach((item) => {
            const finded_item = payload.config?.selected_language_codes.find(
                (code) => code === item.code
            )

            if (finded_item) {
                temp.push({
                    label: item.name,
                    value: item.code
                })
            }
        })
        dispatch(setLanguageOptions(temp))
    }

    const getGlobalSideNote = async () => {
        await generatorCommonHandle<IResourceSideNote>(
            () => fetchData<IResourceSideNote>(`${ROUTER_SIDE_NOTE}/global`),
            null,
            async (payload: IResourceSideNote) => {
                dispatch(setGlobalSideNote(payload))
            }
        )
    }

    return (
        <div className="flex h-screen">
            <ConfigFirstTimeDrawer
                open={configFirstTimeDrawer}
                onClose={() => setConfigFirstTimeDrawer(false)}
            ></ConfigFirstTimeDrawer>
            <Navbar></Navbar>

            <ConnectNetwork></ConnectNetwork>

            <main className="h-full flex-1 flex flex-col">
                <Header></Header>

                <article id="id_main_section" className="bg-bg relative h-full overflow-auto">
                    <div
                        className={`absolute bottom-4 z-40 left-2 tablet:left-4 laptop:left-6 flex space-x-2`}
                    >
                        {globalSideNote && (
                            <Tooltip title="Ghi chú toàn trang">
                                <Avatar
                                    className={`component-avatar-button ${
                                        isSideNoteDisplaying
                                            ? "opacity-100 shadow-primary bg-black"
                                            : ""
                                    }`}
                                    style={{
                                        backgroundColor: globalSideNote.color_hex || "#ffffff"
                                    }}
                                    onClick={() => setIsSideNoteDisplaying((prev) => !prev)}
                                    size={46}
                                    icon={<BsBookmarkStarFill />}
                                />
                            </Tooltip>
                        )}

                        <Tooltip title={`${hasFullscreen ? `Thoát` : `Toàn màn hình`} (F)`}>
                            <Avatar
                                className={`component-avatar-button`}
                                onClick={() =>
                                    hasFullscreen
                                        ? dispatch(setExitFullScreen())
                                        : dispatch(setFullScreen())
                                }
                                size={46}
                                icon={
                                    hasFullscreen ? (
                                        <FullscreenExitOutlined />
                                    ) : (
                                        <FullscreenOutlined />
                                    )
                                }
                            />
                        </Tooltip>
                    </div>

                    {isSideNoteDisplaying && globalSideNote && (
                        <div className="absolute shadow-primary w-screen tablet:w-[400px] bottom-[72px] z-30 left-0 tablet:left-4 laptop:left-6">
                            <div
                                className="group max-h-[320px] tablet:max-h-[360px] overflow-auto"
                                style={{ backgroundColor: globalSideNote.color_hex || "#ffffff" }}
                            >
                                <div className="p-3">
                                    <p className="font-semibold mb-4">{globalSideNote.title}</p>
                                    <div>
                                        <p className="whitespace-pre-line text-[0.9rem]">
                                            {globalSideNote.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="h-full overflow-auto pb-[72px] px-1 tablet:px-4 laptop:px-6 pt-2 tablet:pt-4">
                        {children}
                    </div>
                </article>
            </main>
        </div>
    )
}
