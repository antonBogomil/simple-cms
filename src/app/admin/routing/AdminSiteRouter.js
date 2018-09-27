import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import LoginContainer from "../security/container/LoginContainer";
import LogoutContainer from "../security/container/LogoutContainer";

import {connect} from 'react-redux';
import {checkAuth} from "../security/actions/securityAction";
import AdminDashboardRouter from "./AdminDashboardRouter";

const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
    <Route {...rest} render={
        (props) => (
            isAuth ? <Component {...props} /> : <Redirect to='/admin/login'/>)}/>
);

class AdminSiteRouter extends Component {

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
            isDataLoad
                ? (
                    <div className="fullHeight">
                        <Switch>
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

                            <PrivateRoute isAuth={isAuthenticated}
                                          component={AdminDashboardRouter}/>


                        </Switch>
                    </div>
                ) : null
        )
    };


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.security.isAuthenticated,
    }
};

export default connect(mapStateToProps, {checkAuth})(AdminSiteRouter);