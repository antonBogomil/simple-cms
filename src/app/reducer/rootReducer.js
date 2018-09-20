import {combineReducers} from 'redux';

import authReducer from './auth/authReducer';
import pageReducer from "../admin/page/reducer/pageReducer";

export default combineReducers({
    auth: authReducer,
    pages: pageReducer
});