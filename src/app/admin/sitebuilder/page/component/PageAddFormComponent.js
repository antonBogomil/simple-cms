import React, {Component} from 'react';
import PropType from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContentComponent from "../../../ContentComponent";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';


import Style from '../style/AddPageComponentStyle';


class PageAddFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            metaKeywords: '',
            metaDescription: '',
            isMainPage: false,
        };
    }

    handeSavePage = event => {
        event.preventDefault();

        const page = {
            title: this.state.title,
            url: this.state.url,
            metaDescription: this.state.metaDescription,
            metaKeywords: this.state.metaKeywords,
            isMainPage: this.state.isMainPage
        };

        const {onPageCreate} = this.props;
        onPageCreate(page);

        this.handleClearForm();
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

        const {
            title,
            url,
            metaDescription,
            metaKeywords,
            isMainPage
        } = this.state;


        return (
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

                        <TextField fullWidth
                                   value={isMainPage ? '' : url}
                                   onChange={(event) => this.setState({url: event.target.value})}
                                   className={classes.marginDiv}
                                   label="Page url"
                                   required={!isMainPage}
                                   helperText='If this page is main, the url will be empty by default'
                                   InputProps={{
                                       readOnly: isMainPage,
                                       startAdornment: (
                                           <InputAdornment position='start'
                                                           className={classes.hostNameAdornment}>
                                               {window.location.origin}/
                                           </InputAdornment>
                                       )
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
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>
            </ContentComponent>

        );
    }
}

PageAddFormComponent.propType = {
    classes: PropType.object.isRequired,
};

export default withStyles(Style)(PageAddFormComponent);
