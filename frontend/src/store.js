import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { artworkListReducer, artworkDeleteReducer, artworkDetailsReducer, artworkCreateReducer, artworkUpdateReducer } from './reducers/artworkReducers'
import { userLoginReducer } from './reducers/userReducers'
import { siteListReducer, siteUpdateReducer } from './reducers/siteReducers'

const reducer = combineReducers({
    artworkList: artworkListReducer,
    userLogin: userLoginReducer,
    artworkDelete: artworkDeleteReducer,
    artworkDetails: artworkDetailsReducer,
    artworkCreate: artworkCreateReducer,
    artworkUpdate: artworkUpdateReducer,
    siteList: siteListReducer,
    siteUpdate: siteUpdateReducer,
})

const userInfoFromStorage = sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : null

const siteInfoFromStorage = sessionStorage.getItem('siteInfo')
    ? JSON.parse(sessionStorage.getItem('siteInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    siteList: { sites: siteInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store