import { createSlice } from '@reduxjs/toolkit'

export const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState: { user: {} },
    reducers: {
        userUpdateRequest: (state, action) => {
            return { loading: true }
        },
        userUpdateSuccess: (state, action) => {
            return { loading: false, success: true }
        },
        userUpdateFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        userUpdateReset: (state, action) => {
            return {
                user: {}
            }
        },
    }
})

export const { userUpdateRequest, userUpdateSuccess, userUpdateFail, userUpdateReset} = userUpdateSlice.actions
export default userUpdateSlice.reducer