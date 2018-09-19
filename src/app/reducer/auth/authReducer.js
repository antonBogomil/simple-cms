import {USER_AUTHENTICATED} from '../../actions/auth/types';

const initialState = {
    isAuthenticated: false,
    isLoad: false
};

export default function(state = initialState, action) {

    switch (action.type) {
        case USER_AUTHENTICATED: {
            return {
                ...state,
                isAuthenticated: action.isAuth,
                isLoad: action.isLoad
            }
        }

        default:
            return state;
    }
};