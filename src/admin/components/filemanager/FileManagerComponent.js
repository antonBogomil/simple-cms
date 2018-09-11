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


class FileManagerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currFolder: [],
            currentPath: ''
        };
    }

    handleGetFolder = name => {
        const url = '/api/folder/get' + (name ? '/' + name : '');
        axios.get(url)
            .then(response => {
                const root = response.data;
                this.setState({
                    currFolder: root,
                    currentPath: root.path
                });
            })
            .catch(exception => {
                console.log("FileManagerComponent:" + exception);
            })
    };

    componentDidMount() {
        this.handleGetFolder();
    }

    openFolder = file => {
        this.handleGetFolder(file);
    };


    render() {
        const {classes} = this.props;
        const {currFolder} = this.state;
        const {currentPath} = this.state;

        return (
            <ContentComponent navigation="Filemanager / root">
                <Grid container>

                    <Grid item xs={6}>
                        <Typography className={classes.managerPath} variant="title">
                            \{currentPath}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="title">Options</Typography>
                        <Divider/>
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
                            <Typography variant="caption"
                                        color="primary">
                                Create a foder or donwload a file
                            </Typography>
                        )}
                    </Grid>


                </Grid>
            </ContentComponent>
        );
    }

}

FileManagerComponent.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(Style)(FileManagerComponent);