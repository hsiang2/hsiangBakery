import axios from 'axios'
import { useSelector } from 'react-redux'
import { addItem, removeItem, saveShippingAddress, savePaymentMethod } from './cart'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(addItem({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
    }))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(removeItem(id))

    localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems))
}

export const saveShipping = (data) => (dispatch) => {
    dispatch(saveShippingAddress(data))

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePayment = (data) => (dispatch) => {
    dispatch(savePaymentMethod(data))

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}