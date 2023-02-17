import { createSlice } from '@reduxjs/toolkit'

export const orderPaySlice = createSlice({
    name: "orderPay",
    initialState: {},
    reducers: {
        orderPayRequest: (state, action) => {
            return { loading: true }
        },
        orderPaySuccess: (state, action) => {
            return { loading: false, sucess: true }
        },
        orderPayFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        orderPayReset: (state, action) => {
            return {}
        }
    }
})

export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } = orderPaySlice.actions
export default orderPaySlice.reducer