import React, {Component} from 'react';
import axios from 'axios';

import FileManagerOptions from "../component/FileManagerOptions";

class FileManagerOptionsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadProgress: 0
        };

        this.cancelToken = axios.CancelToken;
        this.source = this.cancelToken.source();
    }


    handleCreateFolder = folderName => {
        const {currentFolder} = this.props;

        //in post method data is the second param, so skip this argument
        axios.post('/api/folder/create', '', {
            params: {
                folderName: folderName,
                destPath: currentFolder.name
            }
        })
            .then(response => {
                const status = response.status;

                if (status === 201) {
                    const currFolder = response.data;

                    const {onCreate} = this.props;
                    onCreate(currFolder);
                }
            })
            .catch(exception => {
                const message = exception.response.data.message;
                const {onFailure} = this.props;
                onFailure(message);
            })

    };

    handleUploadFiles = files => {
        const {currentFolder} = this.props;

        Array.from(files).forEach(file => {

            const data = new FormData();
            data.set('file', file);
            data.set('folderName', currentFolder.name);

            axios.post('/api/file/store', data, {
                onUploadProgress: event => {
                    const total = event.total;

                    this.setState({
                        uploadProgress: Math.round(event.loaded * 100) / total
                    })
                },

                cancelToken: this.source.token,
            })
                .then(response => response.data)
                .then(data => {
                    const code = data.code;

                    if (code === 201) {
                        this.setState({uploadProgress: 0});
                        const {onSuccess} = this.props;
                        onSuccess();
                    }
                })
                .catch(exception => {
                    if (exception.response) {
                        const message = exception.response.data.message;
                        const {onFailure} = this.props;
                        onFailure(message);
                    }
                });


        });


    };

    handleCancelUpload = () => {
        this.source.cancel();
        this.source = this.cancelToken.source();
    };


    render() {
        const {uploadProgress} = this.state;

        return (
            <FileManagerOptions onUpload={this.handleUploadFiles}
                                onCancelUpload={this.handleCancelUpload}
                                onFolderCreate={this.handleCreateFolder}
                                uploadProgress={uploadProgress}/>

        );
    }
}


export default (FileManagerOptionsContainer);