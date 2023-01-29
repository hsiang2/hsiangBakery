import axios from 'axios'
import { productsRequest, productsSuccess, productsFail } from './productList'
import { request, success, fail } from './productDetail'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch(productsRequest())
        const { data } = await axios.get('/api/products')
        dispatch(productsSuccess(data))

    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(productsFail(error))
    }
}

export const listProductDetail = (id) => async (dispatch) => {
    try {
        dispatch(request())
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch(success(data))

    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(fail(error))
    }
}