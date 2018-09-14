import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


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

        const {isHover} = this.state;

        //get exctension of file
        const ext = file.name.substr(file.name.lastIndexOf('.') + 1);


        return (
            <Grid container
                  item xs={1}
                  className={classes.viewContainer}
                  onMouseEnter={() => this.setState({isHover: true})}
                  onMouseLeave={() => this.setState({isHover: false})}

            >
                <Grid item xs={12}
                      title={file.name}
                      onClick={file.directory ? this.openFolder : this.downloadFile}
                >
                    {
                        file.directory
                            ? (<FolderIcon
                                color="primary"
                                className={classes.iconStyle}/>)
                            : isHover
                            ? <SaveIcon color="primary"
                                        className={classes.saveIcon}/>

                            : <FileIcon size={45}
                                        extension={ext}
                                        {...defaultStyles[ext]}/>
                    }

                    <Grid item xs={12}>
                        <Typography className={classes.fileLabel}
                                    variant="caption">
                            {file.name}
                        </Typography>
                    </Grid>
                </Grid>


                {isHover && !file.directory ?
                    (
                        <Grid item xs={12}
                              title={"Delete " + (file.directory ? "directory" : "file")}
                              onClick={() => console.log("Click")}>
                            <DeleteIcon style={{height: '20px', width: '20px'}} color="primary"/>
                        </Grid>
                    ) : null
                }
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