import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { artworkListReducer, artworkDeleteReducer, artworkDetailsReducer, artworkCreateReducer, artworkUpdateReducer } from './reducers/artworkReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
    artworkList: artworkListReducer,
    userLogin: userLoginReducer,
    artworkDelete: artworkDeleteReducer,
    artworkDetails: artworkDetailsReducer,
    artworkCreate: artworkCreateReducer,
    artworkUpdate: artworkUpdateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store