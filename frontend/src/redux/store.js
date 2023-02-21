//import { createStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productListReducer from './productList'
import productDetailReducer from './productDetail'
import cartReducer from './cart'
import userLoginReducer from './userLogin'
import userRegisterReducer from './userRegister'
import userDetailsReducer from './userDetails'
import userUpdateProfileReducer from './userUpdateProfile'
import orderCreateReducer from './orderCreate'
import orderDetailsReducer from './orderDetails'
import orderPayReducer from './orderPay'
import orderListMyReducer from './orderListMyReducer'
import userListReducer from './userListReducer'
import userDeleteReducer from './userDeleteReducer'
import userUpdateReducer from './userUpdateReducer'

const middleware = [thunk]

export default configureStore({
    reducer: {
        productList: productListReducer,
        productDetail: productDetailReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderListMy: orderListMyReducer,
    },
    preloadedState: {},
    middleware
})