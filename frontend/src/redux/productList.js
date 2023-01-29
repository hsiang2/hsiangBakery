import { createSlice } from '@reduxjs/toolkit'

export const productListSlice = createSlice({
    name: "productList",
    initialState: {
        products: []
    },
    reducers: {
        productsRequest: (state, action) => {
            return { loading: true, products: [] }
        },
        productsSuccess: (state, action) => {
            return { loading: false, products: action.payload }
        },
        productsFail: (state, action) => {
            return { loading: false, error: action.payload }
        },
    }
})

export const { productsRequest, productsSuccess, productsFail } = productListSlice.actions
export default productListSlice.reducer