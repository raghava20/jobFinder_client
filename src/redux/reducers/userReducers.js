import { SET_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATED, LOADING_USER, APPLIED_POST } from "../types";

const initialState = {
    name: "",
    loading: false,
    authenticated: false,
    user: ""
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER:
            return { ...state, user: payload, loading: false, authenticated: true }
        case SET_AUTHENTICATED:
            return { ...state, authenticated: true, loading: false }
        case SET_UNAUTHENTICATED:
            return initialState
        case LOADING_USER:
            return { ...state, loading: true, authenticated: false }
        case APPLIED_POST:
            return { ...state, user: { ...state.user, applied: payload }, loading: false }
        default:
            return state;
    }
}