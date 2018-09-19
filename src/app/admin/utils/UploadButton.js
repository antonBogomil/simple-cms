import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CloudDone from '@material-ui/icons/CloudDone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconClose from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },

    hiddenButton: {
        display: 'none',
    }
});

class UploadButton extends Component {
    constructor(props) {
        super(props);

        this.fileChooserRef = React.createRef();
    }

    handleCancelUpload = () => {
        const {onCancel} = this.props;
        onCancel();
    };

    handleButtonClick = (event) => {
        const {onUpload} = this.props;
        onUpload(event.target.files);
    };

    openFileChooser = () => {
        this.fileChooserRef.current.click();
    };


    render() {

        const {complete} = this.props;
        const {classes} = this.props;

        const isLoading = complete > 0;
        const success = complete === 100;

        const buttonClassName = classNames({
            [classes.buttonSuccess]: success,
        });

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <input
                        multiple
                        accept="*"
                        type="file"
                        className={classes.hiddenButton}
                        onChange={this.handleButtonClick}
                        ref={this.fileChooserRef}

                    />
                    <Button
                        component="span"
                        variant="fab"
                        color="primary"
                        className={buttonClassName}
                        onClick={isLoading ? this.handleCancelUpload : this.openFileChooser}
                        title={isLoading ? Math.round(complete,2) + " %" : "Upload file to server"}
                        style={{zIndex: '2'}}
                        disabled={success}
                    >
                        {success
                            ? <CloudDone/>
                            : isLoading
                                ? <IconClose/>
                                : <CloudUploadIcon/>
                        }

                    </Button>

                    {isLoading && <CircularProgress size={68}
                                                    variant="static"
                                                    value={complete}
                                                    style={success ? {color: 'rgba(0, 0, 0, 0.12)'} : null}
                                                    className={classes.fabProgress}/>
                    }


                </div>
            </div>
        );
    }
}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
    complete: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired

};

export default withStyles(styles)(UploadButton);