import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import FileIcon, {defaultStyles} from 'react-file-icon';
import SaveIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';

import ConfirmDialog from "./utils/ConfirmDialog";

import Style from '../../style/filemanager/FileViewComponentStyle';

class FileViewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHover: false,
            openAlertDialog: false,
        }
    }

    openFolder = () => {
        const {file} = this.props;
        const {onOpenFolder} = this.props;
        onOpenFolder(file.name);
    };

    downloadFile = () => {
        const {file} = this.props;
        const {onDownload} = this.props;
        onDownload(file);
    };

    handleDeleteFile = () => {
        this.setState({openAlertDialog: false});

        const {file} = this.props;
        const {onDelete} = this.props;
        onDelete(file);


    };

    render() {
        const {classes} = this.props;
        const {file} = this.props;

        const {isHover} = this.state;
        const {openAlertDialog} = this.state;

        //get exctension of file
        const ext = file.name.substr(file.name.lastIndexOf('.') + 1);

        return (
            <Grid container
                  item xs={1}
                  className={classes.viewContainer}
                  onMouseEnter={() => this.setState({isHover: true})}
                  onMouseLeave={() => this.setState({isHover: false})}

            >
                <Grid item xs={12}
                      title={file.name}
                >
                    {file.directory
                        ? (<FolderIcon
                            onClick={this.openFolder}
                            color="primary"
                            className={classes.iconStyle}/>)
                        : isHover
                            ? <SaveIcon color="primary"
                                        onClick={this.downloadFile}
                                        className={classes.saveIcon}/>

                            : <FileIcon size={45}
                                        extension={ext}
                                        {...defaultStyles[ext]}/>
                    }

                    <Grid item xs={12}>
                        <Typography className={classes.fileLabel}
                                    variant="caption">
                            {file.name}
                        </Typography>
                    </Grid>
                </Grid>


                {isHover ? (
                    <Grid item xs={12}
                          className={classes.fileOperations}>

                        <Grid title={"Delete file"}
                              onClick={() => this.setState({openAlertDialog: true})}>
                            <DeleteIcon className={classes.operationButton}
                                        color="primary"/>

                            <ConfirmDialog open={openAlertDialog}
                                           title={"Delete information"}
                                           content={"Are you sure that you want delete file? All data will be deleted."}
                                           onConfirm={this.handleDeleteFile}/>
                        </Grid>

                        <Grid title={"Rename file"}>
                            <EditIcon className={classes.operationButton}
                                      color="primary"/>
                        </Grid>
                    </Grid>

                ) : null}
            </Grid>
        );
    }

}

FileViewComponent.propType = {
    classes: PropTypes.object.isRequired,
    isHover: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
    onDownload: PropTypes.func.isRequired,
    onOpenFolder: PropTypes.func.isRequired,

};

export default withStyles(Style)(FileViewComponent);