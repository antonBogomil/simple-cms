import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';

import Style from '../../style/page/AddPageComponentStyle';
import InfoSnackBar from "../utils/InfoSnackBar";


class AddPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            metaKeywords: '',
            metaDescription: '',
            responseMessage: '',
            openInfoDialog: false,
            isMainPage: false,
        };
    }

    handeSavePage = event => {
        event.preventDefault();

        const {title, url, metaKeywords, metaDescription, isMainPage} = this.state;

        const formData = new FormData();
        formData.set('title', title);
        formData.set('url', url);
        formData.set('metaKeywords', metaKeywords);
        formData.set('metaDescription', metaDescription);
        formData.set('isMainPage', isMainPage);

        axios.post('/api/page/save', formData)
            .then(response => {
                this.setState({
                    responseMessage: response.data.message,
                    openInfoDialog: true,
                    title: '',
                    url: '',
                    metaKeywords: '',
                    metaDescription: ''
                });
            }).catch(exception => {
            const errorMgs = exception.response.data.message;
            this.setState({
                responseMessage: errorMgs,
                openInfoDialog: true
            });
        })

    };

    handleClearForm = () => {
        this.setState({
            title: '',
            url: '',
            metaKeywords: '',
            metaDescription: '',
            isMainPage: false
        })
    };

    handleSelectMainPage = event => {
        this.setState({isMainPage: event.target.checked})
    };


    render() {
        const {classes} = this.props;
        const {responseMessage, openInfoDialog} = this.state;
        const {title, url, metaDescription, metaKeywords, isMainPage} = this.state;

        const urlPlaceholder = "Enter the url of website page (" + window.location.origin + "/)";

        return (
            <div>
                <ContentComponent navigation="Page / Add">
                    <div className={classes.mainFormWrapper}>
                        <Typography variant="headline"
                                    color="textPrimary">
                            Add page
                        </Typography>
                        <Divider/>

                        <form id="page-form"
                              autoComplete="off"
                              className={classes.formStyle}
                              onSubmit={this.handeSavePage}
                        >

                            <FormControl fullWidth>
                                <FormLabel component="legend">
                                    If you choose the main page, the previous main page will be overwritten to this.
                                    Only one page can be main.
                                </FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={isMainPage}
                                            onChange={this.handleSelectMainPage}
                                            color="primary"
                                        />
                                    }
                                    label="Is main page"
                                />
                            </FormControl>


                            <TextField placeholder="Enter the title"
                                       fullWidth
                                       value={title}
                                       onChange={(event) => this.setState({title: event.target.value})}
                                       className={classes.marginDiv}
                                       label="Title"
                                       required
                            />

                            <TextField placeholder={urlPlaceholder}
                                       fullWidth
                                       value={isMainPage ? '' : url}
                                       onChange={(event) => this.setState({url: event.target.value})}
                                       className={classes.marginDiv}
                                       label="Page url"
                                       required={!isMainPage}
                                       helperText='If this page is main, the url will be empty by default'
                                       InputProps={{
                                           readOnly: isMainPage
                                       }}
                            />

                            <TextField placeholder="Enter the meta page keywords (SEO)"
                                       fullWidth
                                       multiline
                                       rowsMax="5"
                                       value={metaKeywords}
                                       onChange={(event) => this.setState({metaKeywords: event.target.value})}
                                       className={classes.marginDiv}
                                       label="Page keywords (SEO)"
                            />

                            <TextField placeholder="Enter the meta page description (SEO)"
                                       fullWidth
                                       multiline
                                       rowsMax="5"
                                       value={metaDescription}
                                       onChange={(event) => this.setState({metaDescription: event.target.value})}
                                       className={classes.marginDiv}
                                       label="Page description (SEO)"
                            />


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
                                        onClick={this.handleClearForm}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>


                    <InfoSnackBar open={openInfoDialog}
                                  onClose={() => this.setState({openInfoDialog: false})}
                                  timeOut={2000}
                                  message={responseMessage}/>


                </ContentComponent>
            </div>
        );
    }
}

AddPageComponent.propType = {
    classes: PropType.object.isRequired,
    navigation: PropType.string.isRequired
};

export default withStyles(Style)(AddPageComponent);
