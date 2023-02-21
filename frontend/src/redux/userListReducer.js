import { createSlice } from '@reduxjs/toolkit'

export const userListSlice = createSlice({
    name: "userList",
    initialState: { users: [] },
    reducers: {
        userListRequest: (state, action) => {
            return { loading: true }
        },
        userListSuccess: (state, action) => {
            return { loading: false, users: action.payload }
        },
        userListFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        userListReset: (state, action) => {
            return { user: [] }
        }
    }
})

export const { userListRequest, userListSuccess, userListFail, userListReset } = userListSlice.actions
export default userListSlice.reducer