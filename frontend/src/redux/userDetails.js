import { createSlice } from '@reduxjs/toolkit'

export const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: { user: {} },
    reducers: {
        userDetailsRequest: (state, action) => {
            return { ...state, loading: true }
        },
        userDetailsSuccess: (state, action) => {
            return { loading: false, user: action.payload }
        },
        userDetailsFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        userDetailsReset: (state, action) => {
            return { user: {} }
        },
    }
})

export const { userDetailsRequest, userDetailsSuccess, userDetailsFail, userDetailsReset} = userDetailsSlice.actions
export default userDetailsSlice.reducer