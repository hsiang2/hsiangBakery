import { createSlice } from '@reduxjs/toolkit'

export const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState: {},
    reducers: {
        productDeleteRequest: (state, action) => {
            return { loading: true }
        },
        productDeleteSuccess: (state, action) => {
            return { loading: false, success: true }
        },
        productDeleteFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
})

export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } = productDeleteSlice.actions
export default productDeleteSlice.reducer