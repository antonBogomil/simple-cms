import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Style from '../../style/filemanager/FileManagerComponentStyle';
import ContentComponent from "../../ContentComponent";
import FileViewComponent from "./FileViewComponent";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import CreateFolderIcon from '@material-ui/icons/CreateNewFolder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';

import InfoSnackBar from '../utils/InfoSnackBar';


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
                    <IconButton color="primary"
                                onClick={this.goBack}>
                        <BackIcon/>
                    </IconButton>
                </Grid>
            </Grid>

        )
    }
}

FileManagerBar = withStyles(Style)(FileManagerBar);


class FileManagerOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderName: '',
        }
    }


    handleCreateFolder = () => {
        const {onFolderCreate} = this.props;
        const {folderName} = this.state;
        this.setState({folderName: ''})

        onFolderCreate(folderName);

    };

    render() {
        const {classes} = this.props;
        const {folderName} = this.state;

        return (
            <Grid item xs={4}
                  className={classes.optionsContainer}>

                <Grid item xs={12}>

                    <IconButton onClick={this.handleCreateFolder}>
                        <CreateFolderIcon color="primary"
                                          titleAccess="Create folder"
                                          className={classes.iconSize}
                        />
                    </IconButton>

                    <TextField
                        required
                        className={classes.folderInput}
                        label="Enter folder name"
                        value={folderName}
                        onChange={event => {
                            this.setState({folderName: event.target.value})
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <IconButton>
                        <CloudUploadIcon color="primary"
                                         titleAccess="Upload file"
                                         className={classes.iconSize}/>
                    </IconButton>
                </Grid>

            </Grid>
        );
    }
}

FileManagerOptions = withStyles(Style)(FileManagerOptions);


class FileManagerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: false,
            currFolder: {},
            pathHistory: [],
            errorMessage: ''
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

                if(child !== undefined){
                    //sort child, directory first
                    child.sort((a,b) => b.directory - a.directory);
                    console.log(child);
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
                console.log("FileManagerComponent:" + exception);
            })

    };

    componentDidMount() {
        this.handleGetFolder();
    }

    openFolder = fileName => {
        this.handleGetFolder(fileName);
    };

    createFolder = folderName => {
        this.setState({errorMeesage: ''});

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
            this.setState({errorMessage: exception.response.data.message});
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

    handleGoBack = () => {
        const {pathHistory} = this.state;

        //delete current folder name
        pathHistory.pop();

        // remove folder name and open it
        const prevFolder = pathHistory.pop();
        this.handleGetFolder(prevFolder);

        this.setState({pathHistory: pathHistory});
    };


    render() {
        const {classes} = this.props;
        const {currFolder} = this.state;
        const {errorMessage} = this.state;
        const {isDataLoad} = this.state;

        return (
            <ContentComponent navigation="File-manager / root">
                {
                    isDataLoad ? (
                        <Grid container>

                            <FileManagerBar onMoveBack={this.handleGoBack}
                                            currentPath={currFolder.path
                                            }/>

                            <Grid item xs={8}
                                  className={classes.folderContainer}>
                                {currFolder.children ? (
                                    currFolder.children.map(file => {
                                        return (
                                            <FileViewComponent
                                                key={file.createDate}
                                                onOpenFolder={this.openFolder}
                                                onDownload={this.downloadFile}
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

                            <FileManagerOptions onFolderCreate={this.createFolder}/>


                            {errorMessage !== '' ? (
                                <InfoSnackBar timeOut={2000} message={errorMessage}/>
                            ) : null}

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