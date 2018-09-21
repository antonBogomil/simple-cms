import {FETCH_ARTICLES, DELETE_ARTICLE, UPDATE_ARTICLE, GET_ARTICLE, CREATE_ARTICLE} from "../action/types";
import {openWindowDispatch} from "../../../actions/info/types";

import axios from "axios";


export const fetchArticles = () => dispatch => {
    axios.get('/api/article/list')
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: FETCH_ARTICLES,
                payload: data
            })
        }).catch(exception => {
        const response = exception.response;
        dispatch(openWindowDispatch(response.data.message));
    });

};

export const createArticle = article => dispatch => {
    axios.post('/api/article/save', article)
        .then(response => response.data)
        .then(data => {

            dispatch({
                type: CREATE_ARTICLE,
                payload: data.data
            });

            dispatch(openWindowDispatch(data.message));
        })
        .catch(exception => {
            const response = exception.response;
            dispatch(openWindowDispatch(response.data.message));
        });
};

export const updateArticle = (article, id) => dispatch => {

};

export const deleteArticles = articles => dispatch => {
    articles.forEach(articleId => {
        axios.delete('/api/article/delete/' + articleId)
            .catch(exception => {
                const response = exception.response;
                dispatch(openWindowDispatch(response.data.message));
            })
    });

    const message = articles.length +
        ((articles.length === 1) ? " article" : " articles") +
        " was deleted successfully";

    dispatch({
        type: DELETE_ARTICLE,
        payload: articles
    });

    dispatch(openWindowDispatch(message));
};

export const getArticle = id => dispatch => {

};