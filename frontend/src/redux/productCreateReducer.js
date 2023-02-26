import { createSlice } from '@reduxjs/toolkit'

export const productCreateSlice = createSlice({
    name: "productCreate",
    initialState: {},
    reducers: {
        productCreateRequest: (state, action) => {
            return { loading: true }
        },
        productCreateSuccess: (state, action) => {
            return { loading: false, success: true, product: action.payload }
        },
        productCreateFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        productCreateReset: (state, action) => {
            return {}
        },
    }
})

export const { productCreateRequest, productCreateSuccess, productCreateFail, productCreateReset } = productCreateSlice.actions
export default productCreateSlice.reducer