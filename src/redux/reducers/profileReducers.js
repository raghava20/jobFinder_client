import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE } from "../types";

const initialState = {
    profile: null,
    profiles: [],
    errors: {},
    loading: false
};

// eslint-disable-next-line
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
            return { ...state, profile: payload, loading: false }
        case GET_PROFILES:
            return { ...state, profiles: payload, loading: false }
        case PROFILE_ERROR:
            return { ...state, errors: payload, loading: false }
        case CLEAR_PROFILE:
            return { ...state, profile: null, loading: false }
        default:
            return state;
    }

}