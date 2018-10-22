import React, {Component} from "react";
import {Route, Switch} from "react-router";

import ArticleListContainer from "../sitebuilder/article/container/ArticleListContainer";
import ArticleAddContainer from "../sitebuilder/article/container/ArticleAddContainer";
import ArticleEditContainer from "../sitebuilder/article/container/ArticleEditContainer";
import PageListContainer from "../sitebuilder/page/container/PageListContainer";
import PageAddContainer from "../sitebuilder/page/container/PageAddContainer";
import PageEditContainer from "../sitebuilder/page/container/PageEditContainer";
import FileManagerContainer from "../file/container/FileManagerContainer";
import NavigationBar from "../navigaion/component/NavigationBar";


class AdminDashboardRouter extends Component{

    render() {
        return (
            <Switch>
                <NavigationBar>
                    <Route exact
                           path="/admin/article"
                           component={ArticleListContainer}/>

                    <Route exact
                           path="/admin/article/add"
                           component={ArticleAddContainer}/>

                    <Route exact
                           path="/admin/article/edit/:id"
                           component={ArticleEditContainer}/>

                    <Route exact
                           path="/admin/page"
                           component={PageListContainer}/>

                    <Route exact
                           path="/admin/page/add"
                           component={PageAddContainer}/>

                    <Route exact
                           path="/admin/page/edit/:id"
                           component={PageEditContainer}/>

                    <Route exact
                           path="/admin/files"
                           component={FileManagerContainer}/>

                </NavigationBar>
            </Switch>
        );
    }

}

export default AdminDashboardRouter;