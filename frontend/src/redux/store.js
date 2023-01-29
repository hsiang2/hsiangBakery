//import { createStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productListReducer from './productList'
import productDetailReducer from './productDetail'
import cartReducer from './cart'

const middleware = [thunk]

export default configureStore({
    reducer: {
        productList: productListReducer,
        productDetail: productDetailReducer,
        cart: cartReducer
    },
    preloadedState: {},
    middleware
})