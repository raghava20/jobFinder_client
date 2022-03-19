import { CLEAR_ERRORS, LOADING_UI, SERVER_ERROR, SET_ERRORS, SIGNUP_SUCCESS } from "../types"

const initialState = {
    loading: false,
    signupSuccess: false,
    serverError: false,
    errors: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ERRORS:
            return { ...state, loading: false, errors: payload, serverError: false }
        case LOADING_UI:
            return { ...state, loading: true, signupSuccess: false, serverError: false }
        case SERVER_ERROR:
            return { ...state, loading: false, signupSuccess: false, serverError: true }
        case CLEAR_ERRORS:
            return { ...state, loading: false, errors: null }
        case SIGNUP_SUCCESS:
            return { ...state, loading: false, signupSuccess: true, serverError: false }
        default:
            return state;

    }
}