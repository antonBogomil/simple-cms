import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


import store from '../../../store';
import {openWindowDispatch} from '../../../actions/info/types';
import InfoWindow from '../../utils/InfoWindow';
import FileManagerComponent from '../component/FileManagerComponent';
import FolderViewComponent from '../component/FolderViewComponent';
import FileManagerOptionsContainer from "./FileManagerOptionsContainer";


class FileManagerContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoad: false,
            currFolder: {},
            pathHistory: [],
        };
    }

    handleOpenFolder = name => {
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
                const message = exception.response.data.message;
                store.dispatch(openWindowDispatch(message));
            })

    };

    handleCreateFolder = currentFolder => {
        this.setState({currFolder: currentFolder});
    };

    handleDownloadFile = file => {
        const link = document.createElement('a');
        link.href = file.downloadLink;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    handleDeleteFile = file => {
        const deleteUrl = file.directory
            ? ('/api/folder/delete/' + file.name)
            : file.deleteLink;

        axios.delete(deleteUrl)
            .then(response => response.data)
            .then(data => {
                const code = data.code;

                if (code === 200) {
                    const {currFolder} = this.state;
                    this.handleOpenFolder(currFolder.name);
                }
            })
            .catch(exception => {
                const message = exception.response.data.message;
                store.dispatch(openWindowDispatch(message));
            })

    };

    handleRenameFile = (oldName, newName) => {
        axios.put('/api/folder/rename', '', {
            params: {
                oldName: oldName,
                newName: newName
            }
        })
            .then(response => response.data)
            .then(data => {
                const code = data.code;

                if (code === 200) {
                    const {currFolder} = this.state;
                    this.handleOpenFolder(currFolder.name);
                }
            })
            .catch(exception => {
                const message = exception.response.data.message;
                store.dispatch(openWindowDispatch(message));
            });

    };

    handleOnFailure = message => {
        store.dispatch(openWindowDispatch(message));
    };

    handleOnSuccess = () => {
        const {currFolder} = this.state;
        this.handleOpenFolder(currFolder.name);
    };

    handleGoBack = () => {
        const {pathHistory} = this.state;

        //delete current folder name
        pathHistory.pop();

        // remove folder name and open it
        const prevFolder = pathHistory.pop();
        this.handleOpenFolder(prevFolder);

        this.setState({pathHistory: pathHistory});
    };

    componentDidMount() {
        this.handleOpenFolder();
    }

    render() {
        const {open} = this.props;
        const {message} = this.props;

        const {currFolder} = this.state;

        return (
            <div>
                <FileManagerComponent currentFolder={currFolder}
                                      historyOnMoveBack={this.handleGoBack}>

                    <FolderViewComponent currentFolder={currFolder}
                                         onOpen={this.handleOpenFolder}
                                         onRename={this.handleRenameFile}
                                         onDelete={this.handleDeleteFile}
                                         onDownload={this.handleDownloadFile}/>

                    <FileManagerOptionsContainer currentFolder={currFolder}
                                                 onSuccess={this.handleOnSuccess}
                                                 onFailure={this.handleOnFailure}
                                                 onCreate={this.handleCreateFolder}/>

                </FileManagerComponent>

                {open ? (
                    <InfoWindow open={open}
                                message={message}/>

                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        open: state.info.open,
        message: state.info.message
    }
};
export default connect(mapStateToProps, null)(FileManagerContainer);