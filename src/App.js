import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import axios from 'axios';

import MainComponent from "./main/components/MainComponent";
import PageComponent from "./main/components/page/PageComponent";
import LoginComponent from "./admin/components/security/LoginComponent";
import LogoutComponent from "./admin/components/security/LogoutComponent";
import AdminSiteRouter from "./admin/routing/AdminSiteRouter";

const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
    <Route {...rest} render={
        (props) => (
            isAuth ? <Component {...props} /> : <Redirect to='/admin/login'/>)}/>
);


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isDataLoaded: false,
        };
    }

    componentDidMount() {
        axios.get('/api/auth/check')
            .then(response => {
                const code = response.data.code;

                if (code === 200) {
                    this.setState({isAuthenticated: true,});
                }

                this.setState({isDataLoaded: true})
            })
            .catch(exception => {
                console.log("Authentication check exception: \n" + exception.message);
            })
    }

    render() {
        const {isAuthenticated} = this.state;
        const {isDataLoaded} = this.state;

        return (
            <div className="fullHeigth">
                {isDataLoaded ? (
                    <BrowserRouter>
                        <Switch>
                            {/*Main page router */}
                            <Route exact path="/" component={MainComponent}/>

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
                            <Route exact path="/admin/login/redirect"
                                   render={props => (
                                       props.location.state.isAuth
                                           ? <Redirect to={"/admin/dashboard"}/>
                                           : <Redirect to={"/admin/login"} />
                                   )}/>

                            <Route exact path="/admin/logout"
                                   component={LogoutComponent}/>

                            <PrivateRoute path="/admin"
                                          isAuth={isAuthenticated}
                                          component={AdminSiteRouter}/>

                            {/* another main site routings */}
                            <Route render={(props) => <PageComponent {...props} />}/>
                        </Switch>
                    </BrowserRouter>
                ) : null}

            </div>
        );
    }
}


export default App;
