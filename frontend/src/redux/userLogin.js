import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) : null

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: { userInfo: userInfoFromStorage },
    reducers: {
        userLoginRequest: (state, action) => {
            return { loading: true }
        },
        userLoginSuccess: (state, action) => {
            return { loading: false, userInfo: action.payload }
        },
        userLoginFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        userLogout: (state, action) => {
            return {}
        }
    }
})

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } = userLoginSlice.actions
export default userLoginSlice.reducer