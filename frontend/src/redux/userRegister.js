import { createSlice } from '@reduxjs/toolkit'

export const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState: {},
    reducers: {
        userRegisterRequest: (state, action) => {
            return { loading: true }
        },
        userRegisterSuccess: (state, action) => {
            return { loading: false, userInfo: action.payload }
        },
        userRegisterFail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail} = userRegisterSlice.actions
export default userRegisterSlice.reducer