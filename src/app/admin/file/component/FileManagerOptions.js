import React, {Component} from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField/TextField";
import UploadButton from "../../utils/UploadButton";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core";
import Style from "../style/FileManagerOptionsStyle";

//TODO: Change file manager module, make this module use redux, divide module components to containers

class FileManagerOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderName: '',
            uploadComplete: 0
        };

        this.cancelToken = axios.CancelToken;
        this.source = this.cancelToken.source();
    }

    handleCreateFolder = event => {
        event.preventDefault();

        const {onFolderCreate} = this.props;
        const {folderName} = this.state;
        this.setState({folderName: ''});

        onFolderCreate(folderName);

    };

    uploadFiles = files => {
        const {currentFolder} = this.props;

        Array.from(files).forEach(file => {

            const data = new FormData();
            data.set('file', file);
            data.set('folderName', currentFolder);

            axios.post('/api/file/store', data, {
                onUploadProgress: event => {
                    const total = event.total;

                    this.setState({
                        uploadComplete: Math.round(event.loaded * 100) / total
                    })
                },

                cancelToken: this.source.token,
            }).then(response => {
                const code = response.data.code;

                if (code === 201) {
                    const {onSuccess} = this.props;

                    this.setState({uploadComplete: 0});
                    onSuccess();
                }

            }).catch(exception => {
                const msg = exception;
                console.log(exception.response);
                const {onFailure} = this.props;
                onFailure(msg);
            });


        });


    };

    cancelUpload = () => {
        this.source.cancel();
        this.source = this.cancelToken.source();
    };

    render() {
        const {classes} = this.props;
        const {folderName} = this.state;
        const {uploadComplete} = this.state;

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
                            onUpload={this.uploadFiles}
                            onCancel={this.cancelUpload}
                            complete={uploadComplete}/>


                        {uploadComplete !== 0 && uploadComplete === 100 ? (
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
    onFailure: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFolderCreate: PropTypes.func.isRequired,
    currentFolder: PropTypes.string.isRequired,
};
FileManagerOptions = withStyles(Style)(FileManagerOptions);
export default FileManagerOptions;