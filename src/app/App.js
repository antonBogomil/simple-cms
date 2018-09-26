import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import MainComponent from "./main/MainComponent";
import AdminSiteRouter from "./admin/routing/AdminSiteRouter";

import {connect} from 'react-redux';
import {checkAuth} from './admin/security/actions/securityAction';
import LoginContainer from "./admin/security/container/LoginContainer";
import LogoutContainer from "./admin/security/container/LogoutContainer";


const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
    <Route {...rest} render={
        (props) => (
            isAuth ? <Component {...props} /> : <Redirect to='/admin/login'/>)}/>
);


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: false
        }
    }

    componentWillMount() {
        if (this.props.isAuthenticated === undefined) {
            this.props.checkAuth();
        } else {
            this.setState({isDataLoad: true})
        }

    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.isAuthenticated !== undefined) {
            this.setState({isDataLoad: true})
        }
    };

    render() {
        const {isAuthenticated} = this.props;
        const {isDataLoad} = this.state;

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
                                           : (<LoginContainer/>)
                                   )}/>

                            <Route exact path="/admin/logout"
                                   component={LogoutContainer}/>

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
        isAuthenticated: state.security.isAuthenticated,
    }
};

export default connect(mapStateToProps, {checkAuth})(App);
