import { GET_POST, GET_POSTS, ADD_POST, ADD_POST_REQUEST, CLEAR_POST, POST_ERROR, APPLY_POST } from "../types";

const initialState = {
    post: "",
    posts: [],
    loading: false,
    error: {}
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST:
            return { ...state, post: payload, loading: false }
        case GET_POSTS:
            return { ...state, posts: payload, loading: false }
        case ADD_POST:
            return { ...state, posts: [...state.posts, payload], loading: false }
        case ADD_POST_REQUEST:
            return { ...state, loading: true }
        case CLEAR_POST:
            return { ...state, post: null, error: null, loading: false }
        case POST_ERROR:
            return { ...state, error: payload, loading: false }
        case APPLY_POST:
            return { ...state, post: { ...state.post, apply: payload.apply }, loading: false }
        default:
            return state;
    }
}