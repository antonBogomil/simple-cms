import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Style from '../style/FileManagerComponentStyle';
import ContentComponent from "../../ContentComponent";
import FileViewComponent from "./FileViewComponent";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import UploadButton from "../../utils/UploadButton";
import InfoWindow from "../../utils/InfoWindow";



class FileManagerBar extends Component {

    goBack = () => {
        const {onMoveBack} = this.props;
        onMoveBack();
    };

    render() {
        const {classes} = this.props;
        const {currentPath} = this.props;

        return (
            <Grid item xs={8} className={classes.managerPath}>
                <Grid item style={{marginBottom: '25px'}}>
                    <Typography variant="title"
                                title={currentPath}
                                className={classes.titleOverflow}
                    >
                        {currentPath}
                    </Typography>
                </Grid>

                <Grid item xs={2}>
                    <Button color="primary"
                            onClick={this.goBack}>
                        <BackIcon/>
                    </Button>
                </Grid>
            </Grid>

        )
    }
}

FileManagerBar.propType = {
    onMoveBack: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired
};
FileManagerBar = withStyles(Style)(FileManagerBar);


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


class FileManagerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: false,
            currFolder: {},
            pathHistory: [],
            infoMessage: '',
            openInfoDialog: false,
            openConfirmDialog: false,
        };
    }

    handleGetFolder = name => {
        const url = '/api/folder/get' + (name ? '/' + name : '');
        axios.get(url)
            .then(response => {
                const root = response.data;

                const {pathHistory} = this.state;
                pathHistory.push(root.name);

                const child = root.children;

                if (child !== undefined) {
                    //sort child, directory first
                    child.sort((a, b) => b.directory - a.directory);
                    root.children = child;
                }
                this.setState({
                    currFolder: root,
                    currentPath: root.path,
                    pathHistory: pathHistory,
                    isDataLoad: true
                });
            })
            .catch(exception => {
                this.setState({
                    infoMessage: exception.response.data.message,
                    openInfoDialog: true
                });
            })

    };

    openFolder = fileName => {
        this.handleGetFolder(fileName);
    };

    createFolder = folderName => {
        this.setState({infoMeesage: ''});

        const {currFolder} = this.state;

        //in post method data is the second param, so skip this argument
        axios.post('/api/folder/create', "", {
            params: {
                folderName: folderName,
                destPath: currFolder.name
            }
        }).then(response => {
            const status = response.status;

            if (status === 201) {
                this.setState({currFolder: response.data})
            }
        }).catch(exception => {
            this.setState({
                infoMessage: exception.response.data.message,
                openInfoDialog: true
            });

        });

    };

    downloadFile = file => {
        const link = document.createElement('a');
        link.href = file.downloadLink;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    deleteFile = file => {
        const deleteUrl = file.directory
            ? ('/api/folder/delete/' + file.name)
            : file.deleteLink;

        axios.delete(deleteUrl)
            .then(response => {
                const code = response.data.code;

                if (code === 200) {
                    const {currFolder} = this.state;
                    this.handleGetFolder(currFolder.name);
                    this.setState({
                        infoMessage: response.data.message,
                        openInfoDialog: true
                    });
                }
            }).catch(exception => {
            console.log(exception);
        })

    };

    renameFile = (oldName, newName) => {

        axios.put('/api/folder/rename', '', {
            params: {
                oldName: oldName,
                newName: newName
            }
        }).then(response => {
            const code = response.data.code;

            if (code === 200) {
                this.setState({
                    infoMessage: response.data.message,
                    openInfoDialog: true
                });

                const {currFolder} = this.state;
                this.handleGetFolder(currFolder.name);
            }

        }).catch(exception => {
            const message = exception.response.data.message;
            this.setState({
                infoMessage: message,
                openInfoDialog: true
            });

        })
    };

    handleOnFailure = message => {
        this.setState({infoMessage: message});
    };

    handleOnSuccess = () => {
        const {currFolder} = this.state;
        this.handleGetFolder(currFolder.name);
    };

    handleGoBack = () => {
        const {pathHistory} = this.state;

        //delete current folder name
        pathHistory.pop();

        // remove folder name and open it
        const prevFolder = pathHistory.pop();
        this.handleGetFolder(prevFolder);

        this.setState({pathHistory: pathHistory});
    };

    componentDidMount() {
        this.handleGetFolder();
    }

    render() {
        const {classes} = this.props;
        const {currFolder} = this.state;
        const {infoMessage} = this.state;
        const {isDataLoad} = this.state;
        const {openInfoDialog} = this.state;

        return (
            <ContentComponent navigation="File-manager">
                {
                    isDataLoad ? (
                        <Grid container>

                            <FileManagerBar onMoveBack={this.handleGoBack}
                                            currentPath={currFolder.path}
                            />

                            <Grid item xs={8}
                                  className={classes.folderContainer}>
                                {currFolder.children ? (
                                    currFolder.children.map((file, index) => {
                                        return (
                                            <FileViewComponent
                                                onOpenFolder={this.openFolder}
                                                onDownload={this.downloadFile}
                                                onRename={this.renameFile}
                                                onDelete={this.deleteFile}
                                                key={index}
                                                file={file}/>
                                        )
                                    })
                                ) : (
                                    <Grid item xs={12} className={classes.emptyFolderAlert}>
                                        <Typography variant="caption">
                                            Create a folder or upload a file
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>

                            <FileManagerOptions currentFolder={currFolder.name}
                                                onFolderCreate={this.createFolder}
                                                onFailure={this.handleOnFailure}
                                                onSuccess={this.handleOnSuccess}/>


                            <InfoWindow open={openInfoDialog}
                                        onClose={() => this.setState({openInfoDialog: false})}
                                        timeOut={2000}
                                        message={infoMessage}/>

                        </Grid>

                    ) : null
                }
            </ContentComponent>
        );
    }

}

FileManagerComponent.propType = {
    classes: PropTypes.object.isRequired,
    currFolder: PropTypes.array.isRequired,
    isDataLoad: PropTypes.bool.isRequired
};

export default withStyles(Style)(FileManagerComponent);