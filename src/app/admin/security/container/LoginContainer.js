import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authenticateUser} from "../actions/securityAction";
import LoginComponent from "../component/LoginComponent";
import InfoWindow from "../../utils/InfoWindow";


class LoginContainer extends Component {


    handleLoginUser = (username, password) => {
        const credentials = new FormData();
        credentials.set('username', username);
        credentials.set('password', password);

        this.props.authenticateUser(credentials);
        this.forceUpdate();
    };


    render() {
        const {open} = this.props;
        const {message} = this.props;

        return (
            <div>
                <LoginComponent onLogin={this.handleLoginUser}/>
                {open ? (<InfoWindow open={open} message={message}/>) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        open: state.info.open,
        message: state.info.message
    }
};

export default connect(mapStateToProps, {authenticateUser})(LoginContainer);