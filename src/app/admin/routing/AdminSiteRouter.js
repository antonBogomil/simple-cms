import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavigationBar from "../navigaion/component/NavigationBar";
import ArticleListComponent from "../article/component/ArticleListComponent";
import AddArticleComponent from "../article/component/AddArticleComponent";
import EditArticleComponent from "../article/component/EditArticleComponent";
import PageListComponent from "../page/component/PageListComponent";
import AddPageComponent from "../page/component/AddPageComponent";
import EditPageComponent from "../page/component/EditPageComponent";
import FileManagerComponent from "../file/component/FileManagerComponent";
import PageListContainer from "../page/container/PageListContainer";


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
                           component={AddPageComponent}/>
                    <Route exact path="/admin/page/edit/:id"
                           component={EditPageComponent}/>
                    <Route exact path="/admin/files"
                           component={FileManagerComponent}/>
                </NavigationBar>
            </Switch>
        )
    };


}

export default AdminSiteRouter;