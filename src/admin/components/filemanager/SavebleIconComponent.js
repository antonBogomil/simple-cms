import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FileIcon, { defaultStyles } from 'react-file-icon';

import CopyFileIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/CloudDownload';
import LinearProgress from '@material-ui/core/LinearProgress';

import Grid from "@material-ui/core/Grid";

import axios from 'axios';

const style = theme => ({

    rootContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    iconWrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },

    iconStyle: {
        transform: "scale(1.5, 1.5)",
        marginBottom: '10px',
        height: '45px',
        width: '45px'
    },
});

class SavebleIconComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            isLoading: false,
            success: false,
            completed: 0
        }
    }

    handleDownloadFile = () => {
        const {file} = this.props;

        axios.get(file.downloadLink, {
            onDownloadProgress: event => {
                console.log("HERE");
                this.setState({completed: event.total});
            },
        });

    };


    render() {
        const {classes} = this.props;
        const {file} = this.props;

        const ext = file.name.split('.')[1];

        const {hover} = this.state;
        const {isLoading} = this.state;

//TODO make react-file-icon works good, add download function and add/delee folder
        return (
            <Grid
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
                onClick={this.handleDownloadFile}
            >
                {isLoading
                    ? <SaveIcon color="primary" className={classes.iconStyle}/>
                    : hover && !isLoading
                        ? <SaveIcon color="primary" className={classes.iconStyle}/>
                        : <CopyFileIcon {...defaultStyles[ext]}/>
                }

                {isLoading ? <LinearProgress variant="determinate" value={this.state.completed}/> : null}

            </Grid>
        );
    }

}

SavebleIconComponent.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(SavebleIconComponent);