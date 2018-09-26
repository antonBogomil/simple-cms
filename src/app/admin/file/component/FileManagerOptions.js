import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField/TextField";
import UploadButton from "../../utils/UploadButton";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core";
import Style from "../style/FileManagerOptionsStyle";


class FileManagerOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderName: '',
        };

    }

    handleCreateFolder = event => {
        event.preventDefault();

        const {onFolderCreate} = this.props;
        const {folderName} = this.state;
        onFolderCreate(folderName);

        this.setState({folderName: ''});
    };

    render() {
        const {classes} = this.props;
        const {uploadProgress} = this.props;
        const {onUpload} = this.props;
        const {onCancelUpload} = this.props;

        const {folderName} = this.state;

        return (
            <Grid item xs={4}
                  className={classes.optionsContainer}>

                <Grid item xs={12}
                      className={classes.fileOption}>
                    <form onSubmit={this.handleCreateFolder}>
                        <Button type="submit"
                                variant="fab"
                                color="primary">
                            <AddIcon titleAccess="Create folder"/>
                        </Button>

                        <TextField
                            required
                            className={classes.marginContainer}
                            label="Enter folder name"
                            value={folderName}
                            onChange={event => {
                                this.setState({folderName: event.target.value})
                            }}
                        />
                    </form>
                </Grid>

                <Grid item xs={12} className={classes.fileOption}>
                    <Grid item xs={12} className={classes.uploadContainer}>
                        <UploadButton
                            onUpload={onUpload}
                            onCancel={onCancelUpload}
                            complete={uploadProgress}/>


                        {uploadProgress !== 0 && uploadProgress === 100 ? (
                            <Typography variant="body1"
                                        color="textPrimary"
                                        className={classes.marginContainer}>
                                Waiting a few minutes for saving file on server
                            </Typography>
                        ) : null}

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

FileManagerOptions.propType = {
    onFolderCreate: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    onCancelUpload: PropTypes.func.isRequired,

    uploadProgress: PropTypes.number.isRequired,
}


FileManagerOptions = withStyles(Style)(FileManagerOptions);
export default FileManagerOptions;