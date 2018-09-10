import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';

import Style from '../../style/filemanager/FileManagerComponentStyle';
import ContentComponent from "../../ContentComponent";
import FileViewComponent from "./FileViewComponent";

class FileManagerComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rootFolder: [],
        }
    }

    componentDidMount(){
        axios.get('/api/folder/get')
            .then(response =>{
                const root = response.data;
                this.setState({rootFolder :root});
            })
            .catch(exception =>{
                console.log("FileManagerComponent:" + exception);
            })
    }


    render(){
        const {rootFolder} = this.state;

        return(
            <ContentComponent navigation={"Admin / Filemanager / " + rootFolder.path}>

                <FileViewComponent file={rootFolder}/>

            </ContentComponent>
        );
    }

}

FileManagerComponent.propType = {
    classes: PropTypes.object.isRequired
};

export default withStyles(Style)(FileManagerComponent);