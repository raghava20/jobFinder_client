import { LOADING_UI, SIGNUP_SUCCESS, SERVER_ERROR, SET_USER, SET_UNAUTHENTICATED, SET_ERRORS, CLEAR_ERRORS } from "../types";
import API_URL from "../../utils/API_URL";

// getting user data after logged in
export const getLoggedInUserData = () => (dispatch) => {
    // dispatch({ type: LOADING_DATA })
    API_URL.get('/auth')
        .then(res => {
            console.log("loading user data", res.data)
            dispatch({
                type: SET_USER,
                payload: res.data.user
            })
        })
        .catch(err => {
            console.log("getUser data error:", err)
        })
}

// signup user
export const signupUser = (newUserData, navigate) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    API_URL.post('/signup', newUserData)
        .then(res => {
            dispatch({
                type: SIGNUP_SUCCESS
            })
            dispatch({ type: CLEAR_ERRORS });
            navigate("/login")
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: SERVER_ERROR,
                });
            }
        })
}

// login user and setup token in localStorage
export const login = (userData, navigate) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    API_URL.post("/login", userData)
        .then(res => {
            const token = res.data.token;
            localStorage.setItem("token", token)
            API_URL.defaults.headers.common["x-auth-token"] = token;

            dispatch(getLoggedInUserData())
            dispatch({ type: CLEAR_ERRORS });
            navigate("/")
        })
        .catch(err => {
            console.log(err.response)
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message,
                });
            } else {
                dispatch({
                    type: SERVER_ERROR,
                });
            }
        })
}

// logout user and remove token from local storage
export const logout = (navigate) => (dispatch) => {
    dispatch({ type: SET_UNAUTHENTICATED })
    navigate("/login")
    localStorage.removeItem("token")
    delete API_URL.defaults.headers.common["x-auth-token"]
}