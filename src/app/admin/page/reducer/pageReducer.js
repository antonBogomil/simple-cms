import {FETCH_PAGES, CREATE_PAGE, DELETE_PAGE, UPDATE_PAGE, GET_PAGE} from "../action/types";

const initialState = {
    pages: [],
    page: {}
};


export default function (state = initialState, action) {

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

        case UPDATE_PAGE: {
            const page = action.payload;
            const pages = state.pages;

            const indexPage = pages.findIndex(p => p.id === page.id);
            pages[indexPage] = page;

            return {
                ...state,
                pages: pages
            }
        }

        case GET_PAGE: {
            return{
                ...state,
                page: action.payload
            }
        }

        default:
            return state;

    }

}