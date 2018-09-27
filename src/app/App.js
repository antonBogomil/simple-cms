import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import MainComponent from "./main/MainComponent";
import AdminSiteRouter from "./admin/routing/AdminSiteRouter";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/*Routers for all admin site components*/}
                    <Route path="/admin" component={AdminSiteRouter}/>

                    {/*Main page router */}
                    <Route component={MainComponent}/>

                </Switch>
            </BrowserRouter>
        );
    }
}

export default (App);
