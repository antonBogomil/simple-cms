import {CHECK_AUTHENTICATION, AUTHENTICATE_USER, LOGOUT_USER} from '../../security/actions/types';

const initialState = {
    isAuthenticated: undefined,
};

export default function (state = initialState, action) {

    switch (action.type) {
        case CHECK_AUTHENTICATION:
        case AUTHENTICATE_USER:
        case LOGOUT_USER: {
            return {
                ...state,
                isAuthenticated: action.payload,
            }
        }
        default:
            return state;
    }
};