import axios from 'axios'
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from './userLogin'
import { userRegisterRequest, userRegisterSuccess, userRegisterFail } from './userRegister'
import { userDetailsRequest, userDetailsSuccess, userDetailsFail, userDetailsReset } from './userDetails'
import { userUpdateProfileRequest, userUpdateProfileSuccess, userUpdateProfileFail } from './userUpdateProfile'
import { orderListMyReset } from './orderListMyReducer'
import { userListFail, userListRequest, userListReset, userListSuccess } from './userListReducer'
import { userDeleteFail, userDeleteRequest, userDeleteSuccess } from './userDeleteReducer'
import { userUpdateFail, userUpdateRequest, userUpdateSuccess } from './userUpdateReducer'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(userLoginRequest())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', {email, password}, config)

        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userLoginFail(error))
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch(userLogout())
    dispatch(userDetailsReset())
    dispatch(orderListMyReset())
    dispatch(userListReset())
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch(userRegisterRequest())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', {name, email, password}, config)

        dispatch(userRegisterSuccess(data))
        dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userRegisterFail(error))
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDetailsRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch(userDetailsSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userDetailsFail(error))
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch(userUpdateProfileRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config)

        dispatch(userUpdateProfileSuccess(data))

        dispatch(userLoginSuccess(data))
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userUpdateProfileFail(error))
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch(userListRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users`, config)

        dispatch(userListSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userListFail(error))
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDeleteRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)

        dispatch(userDeleteSuccess())
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userDeleteFail(error))
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch(userUpdateRequest())

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch(userUpdateSuccess())
        dispatch(userDetailsSuccess(data))
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message:err.message
        dispatch(userUpdateFail(error))
    }
}
