//import { createStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productListReducer from './productList'
import productDetailsReducer from './productDetails'
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
import productDeleteReducer from './productDeleteReducer'
import productCreateReducer from './productCreateReducer'
import productUpdateReducer from './productUpdateReducer'
import orderListReducer from './orderListReducer'
import orderDeliverReducer from './orderDeliverReducer'
import productReviewCreateReducer from './productReviewCreateReducer'
import productTopRatedReducer from './productTopRatedReducer'

const middleware = [thunk]

export default configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,
        productTopRated: productTopRatedReducer ,
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
        orderDeliver: orderDeliverReducer,
        orderListMy: orderListMyReducer,
        orderList: orderListReducer
    },
    preloadedState: {},
    middleware
})