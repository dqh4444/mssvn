import { IResourceSideNote } from "@/types/resources/side-note"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { SelectProps } from "antd"

type ExitFullscreen = typeof document.exitFullscreen
type RequestFullscreen = typeof document.documentElement.requestFullscreen

declare global {
    interface Document {
        webkitExitFullscreen: ExitFullscreen;
        mozCancelFullScreen: ExitFullscreen;
        msExitFullscreen: ExitFullscreen;
    }

    interface HTMLElement {
        webkitRequestFullscreen: RequestFullscreen;
        mozRequestFullScreen: RequestFullscreen;
        msRequestFullscreen: RequestFullscreen;
    }
}

export interface AppState {
    collapsed: boolean
    isLoggedIn: boolean
    hasFullscreen: boolean
    redirectPath: string
    globalSideNote: IResourceSideNote
    languageOptions: SelectProps["options"]
}

const initialState: AppState = {
    collapsed: +localStorage.getItem("mssvn_storage_collapsed") === 1,
    isLoggedIn: true,
    hasFullscreen: false,
    redirectPath: "",
    globalSideNote: null,
    languageOptions: []
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleCollapsed: (state) => {
            state.collapsed = !state.collapsed
            localStorage.setItem("mssvn_storage_collapsed", state.collapsed ? "1" : "0")
        },
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload
            localStorage.setItem("mssvn_storage_collapsed", state.collapsed ? "1" : "0")
        },
        setIsLoggedIn: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true

            if (action.payload) {
                localStorage.setItem("mssvn_storage_token", action.payload)
            }
        },
        setRedirectPath: (state, action: PayloadAction<string>) => {
            state.redirectPath = action.payload
        },
        setIsLoggedOut: (state) => {
            state.isLoggedIn = false

            localStorage.removeItem("mssvn_storage_token")
        },
        setFullScreen: (state) => {
            const elem = document.getElementById("id_main_section")

            if (elem) {

                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                    state.hasFullscreen = true
                } else if (elem.mozRequestFullScreen) { // Firefox
                    elem.mozRequestFullScreen();
                    state.hasFullscreen = true

                } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
                    elem.webkitRequestFullscreen();
                    state.hasFullscreen = true

                } else if (elem.msRequestFullscreen) { // IE/Edge
                    elem.msRequestFullscreen();
                    state.hasFullscreen = true
                }
            }

        },
        setExitFullScreen: (state) => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }

            state.hasFullscreen = false
        },
        setGlobalSideNote: (state, action: PayloadAction<IResourceSideNote>) => {
            state.globalSideNote = action.payload
        },
        setLanguageOptions: (state, action: PayloadAction<SelectProps["options"]>) => {
            state.languageOptions = action.payload
        }
    }
})

export const {
    toggleCollapsed,
    setIsLoggedIn,
    setIsLoggedOut,
    setRedirectPath,
    setCollapsed,
    setGlobalSideNote,
    setFullScreen,
    setExitFullScreen,
    setLanguageOptions
} = appSlice.actions

export default appSlice.reducer
