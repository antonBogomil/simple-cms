import {combineReducers} from 'redux';

import authReducer from './auth/authReducer';
import infoReducer from './info/infoReducer';
import pageReducer from "../admin/page/reducer/pageReducer";
import articleReducer from '../admin/article/reducer/articleReducer';

export default combineReducers({
    info: infoReducer,
    auth: authReducer,
    pages: pageReducer,
    articles: articleReducer
});