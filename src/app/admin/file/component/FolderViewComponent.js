import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import FileViewComponent from "./FileViewComponent";

import Style from '../style/FolderViewComponentStyle';

class FolderViewComponent extends Component {
    render() {
        const {classes} = this.props;

        const {currentFolder} = this.props;

        const {onOpen} = this.props;
        const {onDownload} = this.props;
        const {onRename} = this.props;
        const {onDelete} = this.props;

        return (
            <Grid item xs={8} className={classes.folderContainer}>
                {currentFolder.children ? (
                    currentFolder.children.map((file, index) => {
                        return (
                            <FileViewComponent
                                onOpenFolder={onOpen}
                                onDownload={onDownload}
                                onRename={onRename}
                                onDelete={onDelete}
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
        );
    }
}

export default withStyles(Style)(FolderViewComponent);