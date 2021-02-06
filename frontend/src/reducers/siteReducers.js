import {
    SITE_LIST_FAIL,
    SITE_LIST_REQUEST,
    SITE_LIST_SUCCESS,
    SITE_UPDATE_FAIL,
    SITE_UPDATE_REQUEST,
    SITE_UPDATE_RESET,
    SITE_UPDATE_SUCCESS
} from '../constants/siteConstants'

export const siteListReducer = (state = { sites: [] }, action) => {
    switch (action.type) {
        case SITE_LIST_REQUEST:
            return { loading: true, sites: [] }
        case SITE_LIST_SUCCESS:
            return { loading: false, sites: action.payload }
        case SITE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const siteUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SITE_UPDATE_REQUEST:
            return { loading: true }
        case SITE_UPDATE_SUCCESS:
            return { loading: false, success: true, site: action.payload }
        case SITE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case SITE_UPDATE_RESET:
            return { site: {} }
        default:
            return state
    }
}