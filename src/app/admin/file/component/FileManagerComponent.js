import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Style from '../style/FileManagerComponentStyle';
import ContentComponent from "../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

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


class FileManagerComponent extends Component {

    render() {
        const {currentFolder} = this.props;
        const {historyOnMoveBack} = this.props;

        return (
            <ContentComponent navigation="File-manager">
                <Grid container>
                    <FileManagerBar onMoveBack={historyOnMoveBack}
                                    currentPath={currentFolder.path}
                    />

                   {this.props.children}

                </Grid>
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