import {
    SITE_LIST_FAIL,
    SITE_LIST_REQUEST,
    SITE_LIST_SUCCESS,
    SITE_UPDATE_FAIL,
    SITE_UPDATE_REQUEST,
    SITE_UPDATE_SUCCESS
} from '../constants/siteConstants'
import axios from 'axios'
import { logout } from './userActions'

export const listSites = () => async (dispatch) => {
    try {
        dispatch({ type: SITE_LIST_REQUEST })

        const { data } = await axios.get('/api/site')

        dispatch({
            type: SITE_LIST_SUCCESS,
            payload: data
        })
        localStorage.setItem('siteInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: SITE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateSite = (site) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SITE_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/site/${site._id}`, site, config)

        dispatch({
            type: SITE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: SITE_UPDATE_FAIL,
            payload: message,
        })
    }
}