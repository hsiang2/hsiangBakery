import { createSlice } from '@reduxjs/toolkit'

export const orderDeliverSlice = createSlice({
    name: "orderDeliver",
    initialState: {},
    reducers: {
        orderDeliverRequest: (state, action) => {
            return { loading: true }
        },
        orderDeliverSuccess: (state, action) => {
            return { loading: false, success: true }
        },
        orderDeliverFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        orderDeliverReset: (state, action) => {
            return {}
        }
    }
})

export const { orderDeliverRequest, orderDeliverSuccess, orderDeliverFail, orderDeliverReset } = orderDeliverSlice.actions
export default orderDeliverSlice.reducer