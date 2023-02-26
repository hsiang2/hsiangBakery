import { createSlice } from '@reduxjs/toolkit'

export const productUpdateSlice = createSlice({
    name: "productUpdate",
    initialState: { product: {} },
    reducers: {
        productUpdateRequest: (state, action) => {
            return { loading: true }
        },
        productUpdateSuccess: (state, action) => {
            return { loading: false, success: true, product: action.payload }
        },
        productUpdateFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
        productUpdateReset: (state, action) => {
            return { product: {} }
        },
    }
})

export const { productUpdateRequest, productUpdateSuccess, productUpdateFail, productUpdateReset } = productUpdateSlice.actions
export default productUpdateSlice.reducer