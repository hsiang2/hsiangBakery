import { createSlice } from '@reduxjs/toolkit'

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: { loading: true, orderItems: [], shippingAddress: {} },
    reducers: {
        orderDetailsRequest: (state, action) => {
            return { ...state, loading: true }
        },
        orderDetailsSuccess: (state, action) => {
            return { loading: false, order: action.payload }
        },
        orderDetailsFail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } = orderDetailsSlice.actions
export default orderDetailsSlice.reducer