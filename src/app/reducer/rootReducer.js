import {combineReducers} from 'redux';

import securityReducer from '../admin/security/reducer/securityReducer';
import infoReducer from './info/infoReducer';
import pageReducer from "../admin/sitebuilder/page/reducer/pageReducer";
import articleReducer from '../admin/sitebuilder/article/reducer/articleReducer';

export default combineReducers({
    info: infoReducer,
    security: securityReducer,
    pages: pageReducer,
    articles: articleReducer
});