import { createSlice } from '@reduxjs/toolkit'

export const productTopRatedSlice = createSlice({
    name: "productReviewCreate",
    initialState: { products: [] },
    reducers: {
        productTopRequest: (state, action) => {
            return { loading: true, products: [] }
        },
        productTopSuccess: (state, action) => {
            return { loading: false, products: action.payload }
        },
        productTopFail: (state, action) => {
            return { loading: false, error: action.payload }
        }
    }
})

export const { productTopRequest, productTopSuccess, productTopFail } = productTopRatedSlice.actions
export default productTopRatedSlice.reducer