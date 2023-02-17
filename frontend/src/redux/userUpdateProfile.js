import { createSlice } from '@reduxjs/toolkit'

export const userUpdateProfileSlice = createSlice({
    name: "userUpdateProfile",
    initialState: {},
    reducers: {
        userUpdateProfileRequest: (state, action) => {
            return { loading: true }
        },
        userUpdateProfileSuccess: (state, action) => {
            return { loading: false, success: true, userInfo: action.payload }
        },
        userUpdateProfileFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        userUpdateProfileReset: (state, action) => {
            return {}
        },
    }
})

export const { userUpdateProfileRequest, userUpdateProfileSuccess, userUpdateProfileFail, userUpdateProfileReset} = userUpdateProfileSlice.actions
export default userUpdateProfileSlice.reducer