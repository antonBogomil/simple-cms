import {FETCH_PAGES, CREATE_PAGE, DELETE_PAGE, EDIT_PAGE, GET_PAGE} from "./type";
import axios from 'axios';
import {openWindowDispatch} from "../../../actions/info/types";


export const fetchPages = () => dispatch => {
    axios.get('/api/page/list')
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: FETCH_PAGES,
                payload: data
            })
        }).catch(exception => {
        const response = exception.response;
        dispatch(openWindowDispatch(response.message));
    });

};

export const createPage = page => dispatch => {
    axios.post('/api/page/save', page)
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: CREATE_PAGE,
                payload: data.data,
            });

            dispatch(openWindowDispatch(data.message));

        }).catch(exception => {
        const response = exception.response;
        dispatch(openWindowDispatch(response.message));
    });


};

export const deletePage = pageIds => dispatch => {
    pageIds.forEach(pageId => {
        axios.delete('/api/page/delete/' + pageId)
            .catch(exception => {
                const response = exception.response;
                dispatch(openWindowDispatch(response.message));
            });
    });

    dispatch({
        type: DELETE_PAGE,
        payload: pageIds
    });


    const message = pageIds.length
        + ((pageIds.length === 1) ? " Page" : " Pages")
        + " was deleted successfully.";

    dispatch(openWindowDispatch(message));

};

export const editPage = (page, id) => dispatch => {
    console.log(JSON.stringify(page));

    axios.post('/api/page/update/' + id, page)
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: EDIT_PAGE,
                payload: data.data
            });

            dispatch(openWindowDispatch(data.message));
        }).catch(exception => {
        const response = exception.response;
        dispatch(openWindowDispatch(response.message));
    });

};

export const getPage = id => dispatch => {
    axios.get("/api/page/get/" + id)
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: GET_PAGE,
                payload: data
            })
        }).catch(exception => {
        const response = exception.response;
        dispatch(openWindowDispatch(response.message));
    });

};