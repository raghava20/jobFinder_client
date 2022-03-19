import { GET_POST, GET_POSTS, ADD_POST, ADD_POST_REQUEST, POST_ERROR, CLEAR_POST, APPLY_POST, APPLIED_POST } from "../types";
import API_URL from "../../utils/API_URL";

// get all post posted by recruiter
export const getAllPost = () => (dispatch) => {
    API_URL.get("/post")
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log("all post error", err)
            dispatch({ type: POST_ERROR, payload: err })
        })
}

// get post by using postId
export const getPostById = (id) => (dispatch) => {
    // dispatch({ type: CLEAR_POST })
    API_URL.get(`/post/${id}`)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        }).catch(err => {
            console.log("get post by id error ", err)
            dispatch({ type: POST_ERROR, payload: err })
        })
}

// get all post of logged-in recruiter
export const getPostByUser = () => (dispatch) => {
    API_URL.get("/post/me")
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err => {
            console.log("get post by recruiter error ", err)
            dispatch({ type: POST_ERROR, payload: err })
        })
}

// add post to the feed
export const addPost = (post, navigate) => (dispatch) => {

    dispatch({ type: ADD_POST_REQUEST })
    API_URL.post("/post", post)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            navigate("/")
            dispatch({ type: CLEAR_POST })
        })
        .catch(err => {
            console.log("add post error ", err.response)
            dispatch({ type: POST_ERROR, payload: err.response.data })
        })
}

// apply the job
export const applyJobOnPost = (id) => (dispatch) => {
    API_URL.put(`/post/${id}`)
        .then(res => {
            dispatch({
                type: APPLY_POST,
                payload: { id, apply: res.data }
            })
        }).catch(err => {
            console.log("apply post error ", err.response)
            dispatch({ type: POST_ERROR, payload: err.response.data })
        })
}


// store post id on user when applying
export const appliedPostOnUser = (id) => (dispatch) => {
    API_URL.put(`/post/user/${id}`)
        .then(res => {
            dispatch({
                type: APPLIED_POST,
                payload: res.data
            })
            console.log("last", res.data.appliedJobs)
        }).catch(err => {
            console.log("apply post error ", err.response)
            dispatch({ type: POST_ERROR, payload: err.response.data })
        })
}