import axios from 'axios'
import { productsRequest, productsSuccess, productsFail } from './productList'
import { request, success, fail } from './productDetails'
import { productDeleteFail, productDeleteRequest, productDeleteSuccess } from './productDeleteReducer'
import { productCreateFail, productCreateRequest, productCreateSuccess } from './productCreateReducer'
import { productUpdateFail, productUpdateRequest, productUpdateSuccess } from './productUpdateReducer'
import { productCreateReviewFail, productCreateReviewRequest, productCreateReviewSuccess } from './productReviewCreateReducer'

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

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(productDeleteRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch(productDeleteSuccess())
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(productDeleteFail(error))
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch(productCreateRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/products`, {}, config)

        dispatch(productCreateSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(productCreateFail(error))
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch(productUpdateRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch(productUpdateSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(productUpdateFail(error))
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch(productCreateReviewRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch(productCreateReviewSuccess())
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(productCreateReviewFail(error))
    }
}