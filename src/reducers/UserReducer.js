import {LOGIN, LOGOUT} from "../actions/UserActions";

const initialState = {
    user: {},
    loading: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload.user};
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}
