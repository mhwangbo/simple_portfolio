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

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const siteInfoFromStorage = localStorage.getItem('siteInfo')
    ? JSON.parse(localStorage.getItem('siteInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    siteList: { sites: siteInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store