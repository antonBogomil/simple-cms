import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import MainComponent from "./main/MainComponent";
import LoginComponent from "./admin/security/component/LoginComponent";
import LogoutComponent from "./admin/security/component/LogoutComponent";
import AdminSiteRouter from "./admin/routing/AdminSiteRouter";

import {connect} from 'react-redux';
import {checkAuth} from './actions/auth/authAction';


const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
    <Route {...rest} render={
        (props) => (
            isAuth ? <Component {...props} /> : <Redirect to='/admin/login'/>)}/>
);


class App extends Component {

    componentWillMount() {
        this.props.checkAuth();
    }

    render() {
        const {isAuthenticated} = this.props;
        const {isDataLoad} = this.props;

        return (
            isDataLoad ? (
                <div className="fullHeight">
                    <BrowserRouter>
                        <Switch>
                            {/* Admin routings */}
                            <Route exact path="/admin"
                                   render={() => (isAuthenticated ? (
                                           <Redirect to={"/admin/dashboard"}/>
                                       ) : <Redirect to={"/admin/login"}/>
                                   )}
                            />

                            <Route exact path="/admin/login"
                                   render={() => (
                                       isAuthenticated ? (<Redirect to={"/admin/dashboard"}/>)
                                           : (<LoginComponent/>)
                                   )}/>

                            <Route exact path="/admin/logout"
                                   component={LogoutComponent}/>

                            <PrivateRoute path="/admin"
                                          isAuth={isAuthenticated}
                                          component={AdminSiteRouter}/>

                            {/*Main page router */}
                            <Route path="/" component={MainComponent}/>

                        </Switch>
                    </BrowserRouter>
                </div>
            ) : null
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isDataLoad: state.auth.isLoad
    }
};

export default connect(mapStateToProps, {checkAuth})(App);
