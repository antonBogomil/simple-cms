import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';


import Grid from "@material-ui/core/Grid";
import FileIcon, {defaultStyles} from 'react-file-icon';
import SaveIcon from '@material-ui/icons/CloudDownload';


import Style from '../../style/filemanager/FileViewComponentStyle';

class FileViewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHover: false,
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

    render() {
        const {classes} = this.props;
        const {file} = this.props;
        const ext = file.name.split('.')[1];


        const {isHover} = this.state;

        return (
            <Grid container
                  item xs={1}
                  className={classes.viewContainer}
                  onClick={file.directory ? this.openFolder : this.downloadFile}
                  onMouseEnter={() => this.setState({isHover: true})}
                  onMouseLeave={() => this.setState({isHover: false})}

            >
                {ext === undefined
                    ? <FolderIcon color="primary" className={classes.iconStyle}/>
                    : isHover
                        ? <SaveIcon color="primary" className={classes.saveIcon}/>
                        : <FileIcon size={45} extension={ext} {...defaultStyles[ext]}/>
                }
                <Typography className={classes.fileLabel} variant="caption">{file.name}</Typography>

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