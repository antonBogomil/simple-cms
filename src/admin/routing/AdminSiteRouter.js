import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavigationBar from "../navigaion/NavigationBar";
import ArticleListComponent from "../components/article/ArticleListComponent";
import AddArticleComponent from "../components/article/AddArticleComponent";
import EditArticleComponent from "../components/article/EditArticleComponent";
import PageListComponent from "../components/page/PageListComponent";
import AddPageComponent from "../components/page/AddPageComponent";
import EditPageComponent from "../components/page/EditPageComponent";
import FileManagerComponent from "../components/filemanager/FileManagerComponent";


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
                           component={PageListComponent}/>
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