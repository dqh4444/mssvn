import { IResourceUser } from "@/types/resources/user"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface UserInfoState {
    user: IResourceUser
}

const initialState: UserInfoState = {
    user: null
}

export const userInfoSlice = createSlice({
    name: "user_info",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IResourceUser>) => {
            state.user = action.payload
        }
    }
})

export const { setUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
