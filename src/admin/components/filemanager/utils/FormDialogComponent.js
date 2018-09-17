import React, {Component} from 'react';
import PropType from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open,
            folderName: ''
        }
    }

    handleConfirm = () => {
        const {onConfirm} = this.props;
        const {folderName} = this.state;

        onConfirm(folderName);
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {open} = this.state;
        const {folderName} = this.state;

        const {content} = this.props;
        const {title} = this.props;

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {content}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Folder Name"
                            type="text"
                            value={folderName}
                            onChange={event => this.setState({folderName: event.target.value})}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

FormDialogComponent.propType = {
    open: PropType.bool.isRequired,
    content: PropType.string.isRequired,
    title: PropType.string.isRequired,
    onConfirm: PropType.func.isRequired
};

export default FormDialogComponent;