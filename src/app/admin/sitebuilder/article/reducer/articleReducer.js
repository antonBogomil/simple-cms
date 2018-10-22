import {FETCH_ARTICLES, DELETE_ARTICLE, UPDATE_ARTICLE, GET_ARTICLE, CREATE_ARTICLE} from "../action/types";


const initState = {
    articles: [],
    article: {}
};


export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_ARTICLES: {
            return {
                ...state,
                articles: action.payload
            }
        }

        case DELETE_ARTICLE: {
            const articlesId = action.payload;

            const articles = state.articles
                .filter(a => articlesId.indexOf(a.id) === -1);

            return {
                ...state,
                articles: articles
            }
        }

        case UPDATE_ARTICLE: {
            const article = action.payload;

            const articles = state.articles;
            const index = articles.findIndex(a => a.id === article.id);
            articles[index] = article;

            return {
                ...state,
                articles: articles
            }
        }

        //TODO: after creating article it must add to parent page components
        case CREATE_ARTICLE: {
            const article = action.payload;
            return {
                ...state,
                articles: [...state.articles, article]
            }
        }

        case GET_ARTICLE: {
            return {
                ...state,
                article: action.payload
            }
        }

        default: return state;
    }

}