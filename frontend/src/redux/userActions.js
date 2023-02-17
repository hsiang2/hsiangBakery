import axios from 'axios'
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from './userLogin'
import { userRegisterRequest, userRegisterSuccess, userRegisterFail } from './userRegister'
import { userDetailsRequest, userDetailsSuccess, userDetailsFail, userDetailsReset } from './userDetails'
import { userUpdateProfileRequest, userUpdateProfileSuccess, userUpdateProfileFail } from './userUpdateProfile'
import { orderListMyReset } from './orderListMyReducer'

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
    dispatch(userLogout())
    dispatch(userDetailsReset())
    dispatch(orderListMyReset())
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
