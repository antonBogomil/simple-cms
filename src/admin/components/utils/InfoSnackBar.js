import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class InfoSnackBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        };
    }


    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {message} = this.props;
        const {open} = this.state;


        return (
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                open={open}
                autoHideDuration={5000}
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