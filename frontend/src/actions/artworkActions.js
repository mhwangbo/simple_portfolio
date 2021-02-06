import {
    ARTWORK_LIST_REQUEST,
    ARTWORK_LIST_SUCCESS,
    ARTWORK_LIST_FAIL,
    ARTWORK_DELETE_REQUEST,
    ARTWORK_DELETE_SUCCESS,
    ARTWORK_DELETE_FAIL,
    ARTWORK_DETAILS_REQUEST,
    ARTWORK_DETAILS_FAIL,
    ARTWORK_DETAILS_SUCCESS,
    ARTWORK_CREATE_REQUEST,
    ARTWORK_CREATE_SUCCESS,
    ARTWORK_CREATE_FAIL,
    ARTWORK_UPDATE_FAIL,
    ARTWORK_UPDATE_REQUEST,
    ARTWORK_UPDATE_SUCCESS,
} from '../constants/artworkConstants'
import axios from 'axios'
import { logout } from './userActions'

export const listArtworks = () => async (dispatch) => {
    try {
        dispatch({ type: ARTWORK_LIST_REQUEST })

        const { data } = await axios.get('/api/artworks')

        dispatch({
            type: ARTWORK_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTWORK_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listArtworkDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ARTWORK_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/artworks/${id}`)

        dispatch({
            type: ARTWORK_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ARTWORK_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteArtwork = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTWORK_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/artworks/${id}`, config)

        dispatch({
            type: ARTWORK_DELETE_SUCCESS,
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
            type: ARTWORK_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createArtwork = (name, image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTWORK_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/artworks`, { name, image }, config)

        dispatch({
            type: ARTWORK_CREATE_SUCCESS,
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
            type: ARTWORK_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateArtwork = (artwork) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTWORK_UPDATE_REQUEST
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

        const { data } = await axios.put(`/api/artworks/${artwork._id}`, artwork, config)

        dispatch({
            type: ARTWORK_UPDATE_SUCCESS,
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
            type: ARTWORK_UPDATE_FAIL,
            payload: message,
        })
    }
}