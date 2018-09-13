import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import axios from 'axios';

import MainComponent from "./main/components/MainComponent";
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
            <div className="fullHeight">
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

                            <Route exact path="/admin/logout"
                                   component={LogoutComponent}/>

                            <PrivateRoute path="/admin"
                                          isAuth={isAuthenticated}
                                          component={AdminSiteRouter}/>
                        </Switch>
                    </BrowserRouter>
                ) : null}

            </div>
        );
    }
}


export default App;
