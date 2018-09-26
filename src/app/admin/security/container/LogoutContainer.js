import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from "../actions/securityAction";

import {Redirect} from "react-router-dom";
import InfoWindow from "../../utils/InfoWindow";

class LogoutContainer extends Component {

    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        const {open} = this.props;
        const {message} = this.props;

        const {isAuthenticated} = this.props;

        return (
            <div>
                {open ? (<InfoWindow open={open} message={message}/>) : null}
                {isAuthenticated ? <Redirect to='/'/> : null}
            </div>

        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.security.isAuthenticated,

        open: state.info.open,
        message: state.info.message
    }
};
export default connect(mapStateToProps, {logoutUser})(LogoutContainer);
