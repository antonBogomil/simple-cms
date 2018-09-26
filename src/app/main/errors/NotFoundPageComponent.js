import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const style = theme => ({
    errorContainer: {
        textAlign: 'center',
        margin: '50px'
    },

    fullHeight: {
        height: '100%',
        position: 'absolute'
    }
});

class NotFoundPageComponent extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container className={classes.fullHeight}>
                <Grid item xs={12} className={classes.errorContainer}>
                    <Typography variant="display3" color="textPrimary">
                        Page Not Found
                    </Typography>
                    <Typography variant="display1"  color="textPrimary">
                        404
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(style)(NotFoundPageComponent);

