import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import store from '../../store';
import {CLOSE_WINDOW} from "../../actions/info/types";

class InfoWindow extends Component {

    handleClose = () => {
        store.dispatch({type: CLOSE_WINDOW});
    };


    render() {
        const {message} = this.props;
        const {open} = this.props;


        return (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                open={open}
                onClose={this.handleClose}
                autoHideDuration={2000}
                ContentProps={{'aria-describedby': 'message-id',}}
                message={message}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />


        )
    }
}

export default InfoWindow;