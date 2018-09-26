import {CHECK_AUTHENTICATION, AUTHENTICATE_USER, LOGOUT_USER} from '../../security/actions/types';
import {openWindowDispatch} from "../../../actions/info/types";

import axios from 'axios';

export const checkAuth = () => dispatch => {
    axios.get('/api/auth/check')
        .then(response => response.data)
        .then(data => {
            console.log(data);
            const code = data.code;

            dispatch({
                type: CHECK_AUTHENTICATION,
                payload: code === 200
            });

        })
        .catch(exception => {
            console.log(exception);
        })
};

export const authenticateUser = credentials => dispatch => {
    axios.post('/api/auth/user', credentials)
        .then(response => response.data)
        .then(data => {
            const code = data.code;

            if (code === 200) {
                dispatch({
                    type: AUTHENTICATE_USER,
                    payload: true,
                })
            } else {
                dispatch(openWindowDispatch(data.message));
            }
        })
        .catch(exception => {
            const message = exception.response.data.message;
            dispatch(openWindowDispatch(message));
        });

};

export const logoutUser = () => dispatch => {
    axios.get('/api/auth/logout')
        .then(response => response.data)
        .then(data => {
            const code = data.code;
            dispatch({
                type: LOGOUT_USER,
                payload: !(code === 200)
            })
        })
        .catch(exception => {
                const message = exception.response.data.message;
                dispatch(openWindowDispatch(message));
            }
        );
};