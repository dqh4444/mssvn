import { configureStore } from "@reduxjs/toolkit"
import UserInfoReducer from "./slices/user-info"
import UserReducer from "./slices/app"

export const store = configureStore({
    reducer: {
        app: UserReducer,
        user_info: UserInfoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
