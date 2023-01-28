//import { createStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './productList'

export default configureStore({
    reducer: {
        productList: productListReducer
    }
})