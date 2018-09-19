import {USER_AUTHENTICATED} from './types';
import axios from 'axios';

export const checkAuth = () => dispatch => {
    axios.get('/api/auth/check')
        .then(response => response.data.code)
        .then(code => {
            dispatch({
                type: USER_AUTHENTICATED,
                isAuth: code === 200,
                isLoad: true
            });

        })
};