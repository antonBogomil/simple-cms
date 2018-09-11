import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';

import Style from '../../style/filemanager/FileManagerComponentStyle';
import ContentComponent from "../../ContentComponent";
import FileViewComponent from "./FileViewComponent";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';


class FileManagerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currFolder: [],
            pathHistory: [],
            currentPath: '',
            isDataLoad: false
        };
    }

    handleGetFolder = name => {
        const url = '/api/folder/get' + (name ? '/' + name : '');
        axios.get(url)
            .then(response => {
                const root = response.data;

                const {pathHistory} = this.state;
                pathHistory.push(root.name);

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
        const {currentPath} = this.state;
        const {isDataLoad} = this.state;

        return (
            <ContentComponent navigation="File-manager / root">
                {
                    isDataLoad ? (
                        <Grid container>
                            <Grid item xs={8} className={classes.managerPath}>
                                <Grid item style={{marginBottom: '25px'}}>
                                    <Typography variant="title">
                                        {currentPath}
                                    </Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <IconButton color="primary"
                                                onClick={this.handleGoBack}>
                                        <BackIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={8}
                                  className={classes.folderContainer}
                            >
                                {currFolder.children ? (
                                    currFolder.children.map(file => {
                                        return (
                                            <FileViewComponent
                                                key={file.createDate}
                                                onOpenFolder={this.openFolder}
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
                        </Grid>

                    ) : null
                }
            </ContentComponent>
        );
    }

}

FileManagerComponent.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(Style)(FileManagerComponent);