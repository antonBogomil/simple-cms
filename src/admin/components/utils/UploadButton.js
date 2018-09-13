import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CloudDone from '@material-ui/icons/CloudDone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

        const buttonClassName = classNames({
            [classes.buttonSuccess]: complete === 100,
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
                        onClick={this.openFileChooser}
                        title="Upload file to server"
                    >
                        {complete === 100  ? <CloudDone/> : <CloudUploadIcon/>}
                    </Button>

                    {complete > 0 && <CircularProgress size={68}
                                                  variant="static"
                                                  value={complete}
                                                  className={classes.fabProgress}/>
                    }
                </div>
            </div>
        );
    }
}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);