import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Style from '../../../style/EditPageComponentStyle';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

class PageEditMainTabComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: {},
        };
    }

    handleEditPage = (event, propName) => {
        const {onEdit} = this.props;
        onEdit(event, propName);
    };


    render() {
        const {classes} = this.props;

        const {page} = this.props;


        return (
            <div className={classes.mainFormWrapper}>
                <FormControl fullWidth>
                    <FormLabel component="legend">
                        If you choose the main page, the previous main page will be overwritten to this.
                        Only one page can be main.
                    </FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={page.isMainPage}
                                onChange={event => this.handleEditPage(event, 'isMainPage')}
                                color="primary"
                            />
                        }
                        label="Is main page"
                    />
                </FormControl>


                <FormControl fullWidth>
                    <InputLabel shrink htmlFor="title">Title *</InputLabel>
                    <TextField placeholder="Enter the title"
                               fullWidth
                               style={{marginTop: '16px'}}
                               value={page.title}
                               onChange={(event) => this.handleEditPage(event, 'title')}
                               className={classes.marginDiv}
                               id="Title"
                               required
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel shrink htmlFor="url">
                        Page url {!page.isMainPage ? '*' : null}
                    </InputLabel>

                    <TextField fullWidth
                               style={{marginTop: '16px'}}
                               value={page.isMainPage ? '' : page.url}
                               onChange={(event) => this.handleEditPage(event, 'url')}
                               className={classes.marginDiv}
                               id="url"
                               required={!page.isMainPage}
                               InputProps={{
                                   readOnly: page.isMainPage,
                                   startAdornment: (
                                       <InputAdornment position='start'
                                                       className={classes.hostNameAdornment}>
                                           {window.location.origin}/
                                       </InputAdornment>
                                   )
                               }}
                               helperText='If this page is main, the url will be rewriten and empty by default'
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel shrink htmlFor="metaKeywords">Page keywords (SEO)</InputLabel>
                    <TextField placeholder="Enter the meta page keywords (SEO)"
                               fullWidth
                               style={{marginTop: '16px'}}
                               multiline
                               rowsMax="5"
                               value={page.metaKeywords}
                               onChange={(event) => this.handleEditPage(event, 'metaKeywords')}
                               className={classes.marginDiv}
                               id="metaKeywords"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel shrink htmlFor="metaDescription">Page description (SEO)</InputLabel>
                    <TextField placeholder="Enter the meta page description (SEO)"
                               fullWidth
                               style={{marginTop: '16px'}}
                               multiline
                               rowsMax="5"
                               value={page.metaDescription}
                               onChange={(event) => this.handleEditPage(event, 'metaDescription')}
                               className={classes.marginDiv}
                               id="metaDescription"
                    />
                </FormControl>
            </div>

        );
    }
}

PageEditMainTabComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,
    page: PropType.object.isRequired
};

export default withStyles(Style)(PageEditMainTabComponent);
