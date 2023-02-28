import { createSlice } from '@reduxjs/toolkit'

export const productReviewCreateSlice = createSlice({
    name: "productReviewCreate",
    initialState: {},
    reducers: {
        productCreateReviewRequest: (state, action) => {
            return { loading: true }
        },
        productCreateReviewSuccess: (state, action) => {
            return { loading: false, success: true }
        },
        productCreateReviewFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        productCreateReviewReset: (state, action) => {
            return {}
        },
    }
})

export const { productCreateReviewRequest, productCreateReviewSuccess, productCreateReviewFail, productCreateReviewReset } = productReviewCreateSlice.actions
export default productReviewCreateSlice.reducer