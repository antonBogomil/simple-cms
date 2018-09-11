import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';
import prettyBytes from 'pretty-bytes';

import Grid from "@material-ui/core/Grid";


const style = theme => ({

    viewContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        margin: '10px',

        '&:hover': {
            cursor: 'pointer',
        },
    },


    iconStyle: {
        transform: "scale(2,2)",
        marginBottom: '10px'
    }
});

class FileViewComponent extends Component {

    openFolder = () => {
        const {file} = this.props;
        const {onOpenFolder} = this.props;
        onOpenFolder(file.name);
    };

    render() {
        const {classes} = this.props;
        const {file} = this.props;

        return (
            <Grid container
                  item xs={2}
                  className={classes.viewContainer}
                  onClick={file.directory ? this.openFolder : null}
            >
                {
                    file.directory
                        ?
                        <FolderIcon color="primary" className={classes.iconStyle}/>
                        :
                        <FileIcon color="primary" className={classes.iconStyle}/>
                }
                <Typography variant="caption">{file.name}</Typography>
            </Grid>
        );
    }

}

FileViewComponent.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(FileViewComponent);