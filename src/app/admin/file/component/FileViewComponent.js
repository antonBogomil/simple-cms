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

import ConfirmDialogComponent from "./utils/ConfirmDialogComponent";
import FormDialogComponent from "./utils/FormDialogComponent";

import Style from '../style/FileViewComponentStyle';

class FileViewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHover: false,
            openAlertDialog: false,
            openRenameFileDialog: false,
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

    handleRenameFile = newFileName => {
        this.setState({
            openRenameFileDialog: false,
            isHover: false
        });

        const {file} = this.props;
        const {onRename} = this.props;

        if (file.directory) {
            onRename(file.name, newFileName);
        } else {
            const exc = file.name.substr(file.name.lastIndexOf('.') + 1);
            onRename(file.name, newFileName + "." + exc);
        }

    };

    openConfirmDialog = () => {
        this.setState({openAlertDialog: true});
    };

    openRenameFormDialog = () => {
        this.setState({openRenameFileDialog: true})
    };


    render() {
        const {classes} = this.props;
        const {file} = this.props;

        const {isHover} = this.state;
        const {openAlertDialog} = this.state;
        const {openRenameFileDialog} = this.state;

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
                          className={classes.fileOperations}
                    >
                        <Grid title={"Delete file"}
                              onClick={this.openConfirmDialog}>
                            <DeleteIcon className={classes.operationButton}
                                        color="primary"/>
                        </Grid>

                        <Grid title={"Rename file"}
                              onClick={this.openRenameFormDialog}>
                            <EditIcon className={classes.operationButton}
                                      color="primary"/>
                        </Grid>
                    </Grid>

                ) : null}

                {openAlertDialog ? (
                    <ConfirmDialogComponent open={openAlertDialog}
                                            title={"Delete information"}
                                            content={"Are you sure that you want delete file? All data will be deleted."}
                                            onConfirm={this.handleDeleteFile}/>
                ) : null}

                {openRenameFileDialog ? (
                    <FormDialogComponent open={openRenameFileDialog}
                                         title={"Rename folder"}
                                         content={"Enter new folder name"}
                                         onConfirm={this.handleRenameFile}
                    />
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