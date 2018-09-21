import {combineReducers} from 'redux';

import authReducer from './auth/authReducer';
import infoReducer from './info/infoReducer';
import pageReducer from "../admin/page/reducer/pageReducer";

export default combineReducers({
    info: infoReducer,
    auth: authReducer,
    pages: pageReducer,
});