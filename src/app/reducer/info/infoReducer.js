import {CLOSE_WINDOW, OPEN_WINDOW} from "../../actions/info/types";

const initialState = {
  open: false,
  message: null
};


export default function (state = initialState, action) {

    switch (action.type) {

        case OPEN_WINDOW: {
            return {
                ...state,
                open: true,
                message: action.payload
            }
        }

        case CLOSE_WINDOW: {
            return {
                ...state,
                open: false,
                message: null
            }
        }

        default: return state;
    }
}