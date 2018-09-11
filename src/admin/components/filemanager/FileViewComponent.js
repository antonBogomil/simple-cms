import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';


import Grid from "@material-ui/core/Grid";
import SavebleIconComponent from "./SavebleIconComponent";


const style = theme => ({

    viewContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        margin: '10px',
        wordBreak: 'break-word',

        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(63, 81, 181, 0.08)'
        },
    },


    iconStyle: {
        transform: "scale(2,2)",
        marginBottom: '10px',
        height: '45px',
        width: '45px'
    },

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
        const fileExtension = file.name.split('.')[1];

        return (
            <Grid container
                  item xs={1}
                  className={classes.viewContainer}
                  onClick={file.directory ? this.openFolder : null}
            >
                {fileExtension === undefined
                    ? <FolderIcon color="primary" className={classes.iconStyle}/>
                    : <SavebleIconComponent file={file}/>
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