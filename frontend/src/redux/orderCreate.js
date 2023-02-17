import { createSlice } from '@reduxjs/toolkit'

export const orderCreateSlice = createSlice({
    name: "orderCreate",
    initialState: {},
    reducers: {
        orderCreateRequest: (state, action) => {
            return { loading: true }
        },
        orderCreateSuccess: (state, action) => {
            return { loading: false, success: true, order: action.payload }
        },
        orderCreateFail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const { orderCreateRequest, orderCreateSuccess, orderCreateFail } = orderCreateSlice.actions
export default orderCreateSlice.reducer