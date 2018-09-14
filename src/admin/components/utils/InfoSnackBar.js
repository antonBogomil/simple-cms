import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class InfoSnackBar extends Component {

    handleClose = () => {
       const {onClose} = this.props;
       onClose();
    };

    render() {
        const {message} = this.props;
        const {timeOut} = this.props;
        const {open} = this.props;


        return (
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                    open={open}
                    onClose={this.handleClose}
                    autoHideDuration={timeOut}
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

export default InfoSnackBar;