import axios from 'axios'
import { orderCreateRequest, orderCreateSuccess, orderCreateFail } from './orderCreate'
import { orderDetailsRequest, orderDetailsSuccess, orderDetailsFail } from './orderDetails'
import { orderPayRequest, orderPaySuccess, orderPayFail } from './orderPay'
import { orderListMyRequest, orderListMySuccess, orderListMyFail } from './orderListMyReducer'
import { orderListFail, orderListRequest, orderListSuccess } from './orderListReducer'
import { orderDeliverFail, orderDeliverRequest, orderDeliverSuccess } from './orderDeliverReducer'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderCreateRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch(orderCreateSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(orderCreateFail(error))
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(orderDetailsRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch(orderDetailsSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(orderDetailsFail(error))
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(orderPayRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch(orderPaySuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(orderPayFail(error))
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderDeliverRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch(orderDeliverSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(orderDeliverFail(error))
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListMyRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch(orderListMySuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(orderListMyFail(error))
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config)

        dispatch(orderListSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(orderListFail(error))
    }
}

