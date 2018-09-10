import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';

import Grid from "@material-ui/core/Grid";


const style = theme => ({

    viewContainer: {
        height: '180px',
        width: '180px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        margin: '10px',
    },

    iconStyle: {
        transform: "scale(3,3)",
        marginBottom: '10px'
    }
});

class FileViewComponent extends Component {


    render() {
        const {classes} = this.props;
        const {file} = this.props;

        return (
            <Grid container item xs={6} className={classes.viewContainer}>
                {file.childrens ? <FolderIcon color="primary" className={classes.iconStyle}/> :
                    <FileIcon color="primary"  className={classes.iconStyle}/> }
                <Typography variant="title">{file.name}</Typography>
            </Grid>
        );
    }

}

FileViewComponent.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(FileViewComponent);