import axios from 'axios'
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from './userLogin'
import { userRegisterRequest, userRegisterSuccess, userRegisterFail } from './userRegister'

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
