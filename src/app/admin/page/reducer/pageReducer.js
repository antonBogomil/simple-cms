import {FETCH_PAGES, CREATE_PAGE, DELETE_PAGE} from "../actions/type";

const initialState = {
    pages: [],
    page: {}
};


export default function (state = initialState, action) {
    console.log(action);

    switch (action.type) {
        case FETCH_PAGES: {
            return {
                ...state,
                pages: action.payload
            }
        }

        case CREATE_PAGE: {
            return {
                ...state,
                pages: [...state.pages, action.payload]
            }
        }

        case DELETE_PAGE: {
            // get id of all deleted pages
            const pageIds = action.payload;

            // find and delete all pages whose id contains in deletedId array.
            const pages = state.pages.filter(p => pageIds.indexOf(p.id) === -1);

            return {
                ...state,
                pages: pages
            }

        }


        default:
            return state;

    }

}