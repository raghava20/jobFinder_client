import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

// reducers
import userReducer from "./reducers/userReducers"
import postReducer from "./reducers/postReducers"
import profileReducer from "./reducers/profileReducers"
import uiReducer from "./reducers/uiReducers"

let initialState = {}

const reducers = combineReducers({
    auth: userReducer,
    post: postReducer,
    profile: profileReducer,
    UI: uiReducer
})

const middleware = [thunk];

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

// const store = createStore(reducers, initialState, applyMiddleware(thunk))

export default store;