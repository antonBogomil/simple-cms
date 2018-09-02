import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom';


class AlertDialogComponent extends Component {

    render() {
        const {redirectTo} = this.props;
        const {title} = this.props;
        const {helpMessage} = this.props;

        return (
            <div>
                <Dialog
                    open={true}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {helpMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button button component={Link}
                                to={redirectTo}
                                color="primary" autoFocus>
                            Go to pages
                        </Button>
                        <Button component={Link}
                                to="/admin/dashboard"
                                color="primary">
                            Back to dashboard
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialogComponent;