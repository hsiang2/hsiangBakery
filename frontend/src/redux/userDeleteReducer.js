import { createSlice } from '@reduxjs/toolkit'

export const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState: {},
    reducers: {
        userDeleteRequest: (state, action) => {
            return { loading: true }
        },
        userDeleteSuccess: (state, action) => {
            return { loading: false, success: true }
        },
        userDeleteFail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const { userDeleteRequest, userDeleteSuccess, userDeleteFail, userDeleteReset } = userDeleteSlice.actions
export default userDeleteSlice.reducer