import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';

class LogoutComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogout: false,
        }
    }

    componentDidMount() {
        axios.get('/api/auth/logout')
            .then(response => {
                const code = response.data.code;
                if (code === 200) {
                    this.setState({isLogout: true});
                }
            }).catch(exception => {
                console.log(exception);
            }
        );
    }


    render() {
        const {isLogout} = this.state;

        return (
            <div>
                {isLogout ? (<Redirect to='/'/>) : null}
            </div>
        )
    };
}

export default LogoutComponent;