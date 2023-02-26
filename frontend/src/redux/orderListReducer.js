import { createSlice } from '@reduxjs/toolkit'

export const orderListSlice = createSlice({
    name: "orderList",
    initialState: { orders: [] },
    reducers: {
        orderListRequest: (state, action) => {
            return { loading: true }
        },
        orderListSuccess: (state, action) => {
            return { loading: false, orders: action.payload }
        },
        orderListFail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const { orderListRequest, orderListSuccess, orderListFail } = orderListSlice.actions
export default orderListSlice.reducer