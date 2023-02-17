import { createSlice } from '@reduxjs/toolkit'

export const orderListMySlice = createSlice({
    name: "orderListMy",
    initialState: { orders: [] },
    reducers: {
        orderListMyRequest: (state, action) => {
            return { loading: true }
        },
        orderListMySuccess: (state, action) => {
            return { loading: false, orders: action.payload }
        },
        orderListMyFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        orderListMyReset: (state, action) => {
            return { orders: [] }
        }
    }
})

export const { orderListMyRequest, orderListMySuccess, orderListMyFail, orderListMyReset } = orderListMySlice.actions
export default orderListMySlice.reducer