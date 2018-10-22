import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Style from '../style/EditPageComponentStyle';
import InfoWindow from "../../../utils/InfoWindow";

import {resolveComponentName} from "../../utils/ComponentResolver";

class PageEditFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: {},
            isDataLoad: false,
            responseMessage: '',
            openInfoDialog: false
        };
    }

    handeUpdatePage = event => {
        event.preventDefault();

        const {page} = this.state;
        const {onPageUpdate} = this.props;
        onPageUpdate(page, page.id);

    };

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleEditPage = (event, propName) => {
        const {page} = this.state;
        page[propName] = event.target.value;
        this.setState({page: page});
    };

    handleDeleteComponentFromPage = (event, component) => {
        const {page} = this.state;
        const index = page.components.indexOf(component);

        page.components.splice(index, 1);
        this.setState({page: page});
    };

    handleChangeMainPage = event => {
        const {page} = this.state;
        page.isMainPage = event.target.checked;
        this.setState({page: page});
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.page) {
            this.setState({
                page: nextProps.page,
                isDataLoad: true
            });
        }
    };

    render() {
        const {classes} = this.props;

        const {responseMessage, openInfoDialog} = this.state;

        const {page} = this.state;
        const {isDataLoad} = this.state;

        const urlPlaceholder = "Enter the url of website page (" + window.location.origin + "/)";

        return (
            <div>
                <ContentComponent navigation="Page / Edit">

                    {isDataLoad ? (
                        <div className={classes.mainFormWrapper}>
                            <Typography variant="headline"
                                        color="textPrimary">
                                Edit page
                            </Typography>
                            <Divider/>

                            <form id="page-form"
                                  autoComplete="off"
                                  className={classes.formStyle}
                                  onSubmit={this.handeUpdatePage}
                            >

                                <FormControl fullWidth>
                                    <FormLabel component="legend">
                                        If you choose the main page, the previous main page will be overwritten to this.
                                        Only one page can be main.
                                    </FormLabel>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={page.isMainPage}
                                                onChange={this.handleChangeMainPage}
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
                                               onChange={(event) => this.handleEditPage(event, "title")}
                                               className={classes.marginDiv}
                                               id="Title"
                                               required
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel shrink htmlFor="url">
                                        Page url {!page.isMainPage ? '*' : null}
                                        </InputLabel>

                                    <TextField placeholder={urlPlaceholder}
                                               fullWidth
                                               style={{marginTop: '16px'}}
                                               value={page.isMainPage ? '' : page.url}
                                               onChange={(event) => this.handleEditPage(event, "url")}
                                               className={classes.marginDiv}
                                               id="url"
                                               required={!page.isMainPage}
                                               inputProps={{
                                                   readOnly: page.isMainPage
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
                                               onChange={(event) => this.handleEditPage(event, "metaKeywords")}
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
                                               onChange={(event) => this.handleEditPage(event, "metaDescription")}
                                               className={classes.marginDiv}
                                               id="metaDescription"
                                    />
                                </FormControl>


                                <FormControl style={{width: '50%'}}>
                                    <Typography variant="caption">Page components</Typography>
                                    <Grid item xs={12} className={classes.chipsContainer}>
                                        {page.components.length !== 0 ? (
                                            page.components.map(component => {
                                                return (
                                                    <Chip className={classes.chip}
                                                          key={component.id}
                                                          label={resolveComponentName(component)}
                                                          onDelete={event => this.handleDeleteComponentFromPage(event, component)}
                                                    />
                                                )
                                            })
                                        ) : 'No components yet'}
                                    </Grid>
                                </FormControl>

                                <div className={classes.buttonContainer}>
                                    <Button variant="contained"
                                            color="primary"
                                            type="submit"
                                            form="page-form"
                                            className={classes.button}>
                                        Save
                                    </Button>
                                    <Button variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            onClick={this.handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>

                    ) : null}


                    <InfoWindow open={openInfoDialog}
                                onClose={() => this.setState({openInfoDialog: false})}
                                timeOut={2000}
                                message={responseMessage}/>


                </ContentComponent>
            </div>
        );
    }
}

PageEditFormComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired,
    page: PropType.object.isRequired
};

export default withStyles(Style)(PageEditFormComponent);
