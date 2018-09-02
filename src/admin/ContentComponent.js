import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import Style from './style/ContentComponentStyle';

class ContentComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {classes} = this.props;
        const {navigation} = this.props;
        const {children} = this.props;


        return (
            <div>
                <Typography
                    variant="subheading"
                    className={classes.navigationWrapper}>
                    {navigation}
                </Typography>
                <Paper>
                    {children}
                </Paper>
            </div>
        );
    }
}

ContentComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired
};

export default withStyles(Style)(ContentComponent);
