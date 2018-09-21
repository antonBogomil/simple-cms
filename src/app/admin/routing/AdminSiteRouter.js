import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavigationBar from "../navigaion/component/NavigationBar";
import ArticleListComponent from "../article/component/ArticleListComponent";
import AddArticleComponent from "../article/component/AddArticleComponent";
import EditArticleComponent from "../article/component/EditArticleComponent";

import FileManagerComponent from "../file/component/FileManagerComponent";

import PageListContainer from "../page/container/PageListContainer";
import PageAddContainer from "../page/container/PageAddContainer";
import PageEditContainer from "../page/container/PageEditContainer";


class AdminSiteRouter extends Component {
    render() {
        return (
            <Switch>
                <NavigationBar>
                    <Route exact path="/admin/article"
                           component={ArticleListComponent}/>
                    <Route exact path="/admin/article/add"
                           component={AddArticleComponent}/>
                    <Route exact path="/admin/article/edit/:id"
                           component={EditArticleComponent}/>
                    <Route exact path="/admin/page"
                           component={PageListContainer}/>
                    <Route exact path="/admin/page/add"
                           component={PageAddContainer}/>
                    <Route exact path="/admin/page/edit/:id"
                           component={PageEditContainer}/>
                    <Route exact path="/admin/files"
                           component={FileManagerComponent}/>
                </NavigationBar>
            </Switch>
        )
    };


}

export default AdminSiteRouter;