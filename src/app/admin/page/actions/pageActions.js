import {FETCH_PAGES, CREATE_PAGE, DELETE_PAGE} from "./type";
import axios from 'axios';


export const fetchPages = () => dispatch => {
    axios.get('/api/page/list')
        .then(response => response.data)
        .then(data => {
            dispatch({
                type: FETCH_PAGES,
                payload: data
            })
        });
};

export const createPage = page => dispatch => {
    const formPage = new FormData();

    for (const prop in page) {
        if (page.hasOwnProperty(prop)) {
            formPage.set(prop, page[prop]);
        }
    }

    axios.post('/api/page/save', formPage)
        .then(response => response.data)
        .then(data =>{
            dispatch({
                type: CREATE_PAGE,
                payload: data.data,
            })
        });



};

export const deletePage = pageIds => dispatch => {
    pageIds.forEach(pageId => {
        axios.delete('/api/page/delete/' + pageId)
    });

    dispatch({
        type: DELETE_PAGE,
        payload:  pageIds
    });

};