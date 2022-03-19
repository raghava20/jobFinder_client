import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR } from "../types"
import API_URL from "../../utils/API_URL"

// get all profiles
export const getAllProfiles = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE })
    API_URL.get("/profile")
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log("all profile error: " + err)
            dispatch({ type: PROFILE_ERROR, payload: err })
        })
}

// get profile of logged in user
export const getCurrentUserProfile = () => (dispatch) => {
    API_URL.get("/profile/me")
        .then(res => {
            dispatch({ type: GET_PROFILE, payload: res.data })
        })
        .catch(err => {
            console.log("current profile error: " + err)
            dispatch({ type: PROFILE_ERROR, payload: err })
        })
}

// get profile by user id
export const getUserProfileById = (id) => (dispatch) => {

    API_URL.get(`/profile/user/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE, payload: res.data
            })
        })
        .catch(err => {
            console.log("user profile by id error: " + err)
            dispatch({ type: PROFILE_ERROR, payload: err })
        })
}

// create or update the profile
export const createProfile = (formData, navigate) => (dispatch) => {
    API_URL.post("/profile", formData)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            navigate("/")
        })
        .catch(err => {
            console.log("Create Profile error", err)
            dispatch({ type: PROFILE_ERROR, payload: err })

        })
}